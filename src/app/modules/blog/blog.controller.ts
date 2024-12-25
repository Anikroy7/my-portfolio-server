import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { BlogServices } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
    const BlogData = req.body;
    const result = await BlogServices.createBlogIntoDB(BlogData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog created successfully",
        data: result,
    });
});
const getBlog = catchAsync(async (req, res) => {
    const { BlogId } = req.params;

    const result = await BlogServices.getBlogFromDB(BlogId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Blog retrieved successfully",
        data: result,
    });
});
const updateBlog = catchAsync(async (req, res) => {
    const { BlogId } = req.params;
    const result = await BlogServices.updateBlogIntoDB(BlogId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Blog updated successfully",
        data: result,
    });
});
const deleteBlog = catchAsync(async (req, res) => {
    const { BlogId } = req.params;
    const result = await BlogServices.deleteBlogFromDB(BlogId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Blog deleted successfully",
        data: result,
    });
});

const getAllBlogs = catchAsync(async (req, res) => {

    const result = await BlogServices.getAllBlogsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Blogs retrieved successfully",
        data: result,
    });
});

export const BlogControllers = {
    createBlog,
    deleteBlog,
    getAllBlogs,
    getBlog,
    updateBlog
};
