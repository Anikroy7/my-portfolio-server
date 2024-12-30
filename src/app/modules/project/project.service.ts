import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../types/global";
import { Project } from "@prisma/client";
;


const createProjectIntoDB = async (payload: any) => {
    const { projectLinks, technologies, ...projectData } = payload;


    const newProject = await prisma.$transaction(async (prismaTransication) => {
        const project = await prismaTransication.project.create({
            data: projectData
        })
        for (const technologyId of technologies || []) {

            await prismaTransication.projectTechnology.create({
                data: {
                    projectId: project.id,
                    technologyId: technologyId,
                },
            });
        }

        // Sequentially create project links
        for (const link of projectLinks || []) {
            await prismaTransication.projectLink.create({
                data: {
                    ...link,
                    projectId: project.id,
                },
            });
        }
        return project
    })
    return newProject;
};
const getProjectFromDB = async (_id: string) => {
    const Project = await prisma.project.findUnique({
        where: { id: _id }, include: {
            projectLink: true
        }
    });

    const technologies = await prisma.projectTechnology.findMany({
        where: {
            projectId: Project?.id
        }
    })
    if (!Project) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the Project");
    }
    return { ...Project, technologies };
};
const updateProjectIntoDB = async (_id: string, payload: Project) => {
    const Project = await prisma.project.findUnique({ where: { id: _id } });
    if (!Project) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the Project");
    }
    const updatedProject = await prisma.project.update({
        where: {
            id: _id
        },
        data: payload
    });
    return updatedProject;
};

const getAllProjectsFromDB = async () => {
    const projects = await prisma.project.findMany({
        include: {
            projectTechnology: {
                select: {
                    technology: true
                }
            },
            projectLink: true,

        }
    });
    return projects;
};
const deleteProjectFromDB = async (_id: string) => {

    const result = await prisma.$transaction(async (transactionClient) => {
        const Project = await prisma.project.findUnique({
            where: { id: _id }, include: {
                projectTechnology: true,
                projectLink: true,

            }
        });
        if (!Project) {
            throw new AppError(httpStatus.NOT_FOUND, "Can't find the Project");
        }
        for (const link of Project.projectLink || []) {
            await transactionClient.projectLink.delete({
                where: {
                    id: link.id
                }
            });
        }
        for (const technology of Project.projectTechnology || []) {
            await transactionClient.projectTechnology.delete({
                where: {
                    id: technology.id
                }
            });
            // console.log(technology)
        }

        const result = await transactionClient.project.delete({
            where: {
                id: _id
            }
        })

        return result
    })
    return result
};
export const ProjectServices = {
    createProjectIntoDB,
    deleteProjectFromDB,
    getAllProjectsFromDB,
    updateProjectIntoDB,
    getProjectFromDB
};
