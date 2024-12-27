import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../types/global";
import { Experience } from "@prisma/client";



const createExperienceIntoDB = async (payload: Experience) => {
    const newExperience = await prisma.experience.create({ data: payload });
    if (!newExperience) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Experience");
    }
    return newExperience;
};
const getExperienceFromDB = async (_id: string) => {
    const Experience = await prisma.experience.findUnique({ where: { id: _id} });
    if (!Experience) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the Experience");
    }
    return Experience;
};
const updateExperienceIntoDB = async (_id: string, payload: Experience) => {
    const Experience = await prisma.experience.findUnique({ where: { id: _id } });
    if (!Experience) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the Experience");
    }
    const updatedExperience = await prisma.experience.update({
        where: {
            id: _id
        },
        data: payload
    });
    return updatedExperience;
};

const getAllExperiencesFromDB = async () => {
    const experiences = await prisma.experience.findMany({
        where: {
            isDeleted: false
        }
    });
    return experiences;
};
const deleteExperienceFromDB = async (_id: string) => {

    const Experience = await prisma.experience.findUnique({ where: { id: _id } });
    if (!Experience) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the Experience");
    }
    const updatedExperience = await prisma.experience.delete({
        where: { id: _id },
    });
    return updatedExperience;
};
export const ExperienceServices = {
    createExperienceIntoDB,
    deleteExperienceFromDB,
    getAllExperiencesFromDB,
    updateExperienceIntoDB,
    getExperienceFromDB
};
