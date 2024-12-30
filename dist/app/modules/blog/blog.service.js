"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const global_1 = require("../../types/global");
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlog = yield global_1.prisma.blog.create({ data: payload });
    if (!newBlog) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create Blog");
    }
    return newBlog;
});
const getBlogFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const Blog = yield global_1.prisma.blog.findUnique({ where: { id: _id } });
    if (!Blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the Blog");
    }
    return Blog;
});
const updateBlogIntoDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const Blog = yield global_1.prisma.blog.findUnique({ where: { id: _id } });
    if (!Blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the Blog");
    }
    const updatedBlog = yield global_1.prisma.blog.update({
        where: {
            id: _id
        },
        data: payload
    });
    return updatedBlog;
});
const getAllBlogsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const Blogs = yield global_1.prisma.blog.findMany({
        where: {
            isDeleted: false
        }
    });
    return Blogs;
});
const deleteBlogFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const Blog = yield global_1.prisma.blog.findUnique({ where: { id: _id } });
    if (!Blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the Blog");
    }
    const updatedBlog = yield global_1.prisma.blog.update({
        where: { id: _id },
        data: {
            isDeleted: true
        }
    });
    return updatedBlog;
});
exports.BlogServices = {
    createBlogIntoDB,
    deleteBlogFromDB,
    getAllBlogsFromDB,
    updateBlogIntoDB,
    getBlogFromDB
};
