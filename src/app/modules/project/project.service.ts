import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../types/global";
import { Project } from "@prisma/client";
;


const createProjectIntoDB = async (payload: any) => {
    const { projectLinks, technologies, ...projectData } = payload;

    console.log({ projectLinks, technologies, ...projectData })

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
       include:{
        projectTechnology: {
            select:{
                technology: true
            }
        },
        projectLink: true,
    
       }
    });
    return projects;
};
const deleteProjectFromDB = async (_id: string) => {

    const Project = await prisma.project.findUnique({ where: { id: _id } });
    if (!Project) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the Project");
    }
    const updatedProject = await prisma.project.update({
        where: { id: _id },
        data: {
            isDeleted: true
        }
    });
    return updatedProject;
};
export const ProjectServices = {
    createProjectIntoDB,
    deleteProjectFromDB,
    getAllProjectsFromDB,
    updateProjectIntoDB,
    getProjectFromDB
};
