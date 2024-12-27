import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../types/global";
import { Skill, Technology } from "@prisma/client";
;


const createSkillIntoDB = async (payload: Technology) => {
    const newSkill = await prisma.$transaction(async (prismaTransication) => {
        const technology = await prismaTransication.technology.create({
            data: payload
        })

        await prismaTransication.skill.create({
            data: {
                technologyId: technology.id
            }
        })
        return technology
    })
    return newSkill;
};
const getSkillFromDB = async (_id: string) => {
    const Skill = await prisma.skill.findUnique({ where: { id: _id } });
    if (!Skill) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the Skill");
    }
    return Skill;
};
const updateSkillIntoDB = async (_id: string, payload: Skill) => {
    const Skill = await prisma.skill.findUnique({ where: { id: _id } });
    if (!Skill) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the Skill");
    }
    const updatedSkill = await prisma.skill.update({
        where: {
            id: _id
        },
        data: payload
    });
    return updatedSkill;
};

const getAllSkillsFromDB = async () => {
    const skils = await prisma.skill.findMany({
        where: {
            isDeleted: false
        },
        include: {
            technology: true
        }
    });
    return skils;
};
const deleteSkillFromDB = async (_id: string) => {
    const result = await prisma.$transaction(async (transcationClient) => {
        const deletedSkill = await transcationClient.skill.delete({
            where: {
                id: _id
            }
        })
        const deleteTechnology = await transcationClient.technology.delete({
            where: {
                id: deletedSkill.technologyId
            }
        })
        return deleteTechnology
    })
    return result
};
export const SkillServices = {
    createSkillIntoDB,
    deleteSkillFromDB,
    getAllSkillsFromDB,
    updateSkillIntoDB,
    getSkillFromDB
};
