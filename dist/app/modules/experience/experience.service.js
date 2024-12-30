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
exports.ExperienceServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const global_1 = require("../../types/global");
const createExperienceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newExperience = yield global_1.prisma.experience.create({ data: payload });
    if (!newExperience) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create Experience");
    }
    return newExperience;
});
const getExperienceFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const Experience = yield global_1.prisma.experience.findUnique({ where: { id: _id } });
    if (!Experience) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the Experience");
    }
    return Experience;
});
const updateExperienceIntoDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const Experience = yield global_1.prisma.experience.findUnique({ where: { id: _id } });
    if (!Experience) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the Experience");
    }
    const updatedExperience = yield global_1.prisma.experience.update({
        where: {
            id: _id
        },
        data: payload
    });
    return updatedExperience;
});
const getAllExperiencesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const experiences = yield global_1.prisma.experience.findMany({
        where: {
            isDeleted: false
        }
    });
    return experiences;
});
const deleteExperienceFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const Experience = yield global_1.prisma.experience.findUnique({ where: { id: _id } });
    if (!Experience) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the Experience");
    }
    const updatedExperience = yield global_1.prisma.experience.delete({
        where: { id: _id },
    });
    return updatedExperience;
});
exports.ExperienceServices = {
    createExperienceIntoDB,
    deleteExperienceFromDB,
    getAllExperiencesFromDB,
    updateExperienceIntoDB,
    getExperienceFromDB
};
