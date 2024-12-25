import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { ProjectServices } from "./project.service";

const createProject = catchAsync(async (req, res) => {
    const ProjectData = req.body;
    const result = await ProjectServices.createProjectIntoDB(ProjectData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Project created successfully",
        data: result,
    });
});
const getProject = catchAsync(async (req, res) => {
    const { ProjectId } = req.params;

    const result = await ProjectServices.getProjectFromDB(ProjectId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Project retrieved successfully",
        data: result,
    });
});
const updateProject = catchAsync(async (req, res) => {
    const { ProjectId } = req.params;
    const result = await ProjectServices.updateProjectIntoDB(ProjectId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Project updated successfully",
        data: result,
    });
});
const deleteProject = catchAsync(async (req, res) => {
    const { ProjectId } = req.params;
    const result = await ProjectServices.deleteProjectFromDB(ProjectId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Project deleted successfully",
        data: result,
    });
});

const getAllProjects = catchAsync(async (req, res) => {

    const result = await ProjectServices.getAllProjectsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Projects retrieved successfully",
        data: result,
    });
});

export const ProjectControllers = {
    createProject,
    deleteProject,
    getAllProjects,
    getProject,
    updateProject
};
