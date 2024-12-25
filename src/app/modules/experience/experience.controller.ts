import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { ExperienceServices } from "./experience.service";

const createExperience = catchAsync(async (req, res) => {
    const ExperienceData = req.body;
    const result = await ExperienceServices.createExperienceIntoDB(ExperienceData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Experience created successfully",
        data: result,
    });
});
const getExperience = catchAsync(async (req, res) => {
    const { ExperienceId } = req.params;

    const result = await ExperienceServices.getExperienceFromDB(ExperienceId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Experience retrieved successfully",
        data: result,
    });
});
const updateExperience = catchAsync(async (req, res) => {
    const { ExperienceId } = req.params;
    const result = await ExperienceServices.updateExperienceIntoDB(ExperienceId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Experience updated successfully",
        data: result,
    });
});
const deleteExperience = catchAsync(async (req, res) => {
    const { ExperienceId } = req.params;
    const result = await ExperienceServices.deleteExperienceFromDB(ExperienceId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Experience deleted successfully",
        data: result,
    });
});

const getAllExperiences = catchAsync(async (req, res) => {

    const result = await ExperienceServices.getAllExperiencesFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Experiences retrieved successfully",
        data: result,
    });
});

export const ExperienceControllers = {
    createExperience,
    deleteExperience,
    getAllExperiences,
    getExperience,
    updateExperience
};
