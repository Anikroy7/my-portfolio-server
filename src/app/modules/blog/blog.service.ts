import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../types/global";
import { Blog } from "@prisma/client";



const createBlogIntoDB = async (payload: Blog) => {
    const newBlog = await prisma.blog.create({ data: payload });
    if (!newBlog) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Blog");
    }
    return newBlog;
};
const getBlogFromDB = async (_id: string) => {
    const Blog = await prisma.blog.findUnique({ where: { id: _id} });
    if (!Blog) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the Blog");
    }
    return Blog;
};
const updateBlogIntoDB = async (_id: string, payload: Blog) => {
    const Blog = await prisma.blog.findUnique({ where: { id: _id } });
    if (!Blog) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the Blog");
    }
    const updatedBlog = await prisma.blog.update({
        where: {
            id: _id
        },
        data: payload
    });
    return updatedBlog;
};

const getAllBlogsFromDB = async () => {
    const Blogs = await prisma.blog.findMany({
        where: {
            isDeleted: false
        }
    });
    return Blogs;
};
const deleteBlogFromDB = async (_id: string) => {

    const Blog = await prisma.blog.findUnique({ where: { id: _id } });
    if (!Blog) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the Blog");
    }
    const updatedBlog = await prisma.blog.update({
        where: { id: _id },
        data: {
            isDeleted: true
        }
    });
    return updatedBlog;
};
export const BlogServices = {
    createBlogIntoDB,
    deleteBlogFromDB,
    getAllBlogsFromDB,
    updateBlogIntoDB,
    getBlogFromDB
};
