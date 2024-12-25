import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { SkillServices } from "./skill.service";

const createSkill = catchAsync(async (req, res) => {
    const SkillData = req.body;
    const result = await SkillServices.createSkillIntoDB(SkillData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Skill created successfully",
        data: result,
    });
});
const getSkill = catchAsync(async (req, res) => {
    const { SkillId } = req.params;

    const result = await SkillServices.getSkillFromDB(SkillId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Skill retrieved successfully",
        data: result,
    });
});
const updateSkill = catchAsync(async (req, res) => {
    const { SkillId } = req.params;
    const result = await SkillServices.updateSkillIntoDB(SkillId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Skill updated successfully",
        data: result,
    });
});
const deleteSkill = catchAsync(async (req, res) => {
    const { SkillId } = req.params;
    const result = await SkillServices.deleteSkillFromDB(SkillId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Skill deleted successfully",
        data: result,
    });
});

const getAllSkills = catchAsync(async (req, res) => {

    const result = await SkillServices.getAllSkillsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Skills retrieved successfully",
        data: result,
    });
});

export const SkillControllers = {
    createSkill,
    deleteSkill,
    getAllSkills,
    getSkill,
    updateSkill
};
