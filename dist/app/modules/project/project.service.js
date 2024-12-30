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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const global_1 = require("../../types/global");
;
const createProjectIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectLinks, technologies } = payload, projectData = __rest(payload, ["projectLinks", "technologies"]);
    const newProject = yield global_1.prisma.$transaction((prismaTransication) => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield prismaTransication.project.create({
            data: projectData
        });
        for (const technologyId of technologies || []) {
            yield prismaTransication.projectTechnology.create({
                data: {
                    projectId: project.id,
                    technologyId: technologyId,
                },
            });
        }
        // Sequentially create project links
        for (const link of projectLinks || []) {
            yield prismaTransication.projectLink.create({
                data: Object.assign(Object.assign({}, link), { projectId: project.id }),
            });
        }
        return project;
    }));
    return newProject;
});
const getProjectFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const Project = yield global_1.prisma.project.findUnique({
        where: { id: _id }, include: {
            projectLink: true
        }
    });
    const technologies = yield global_1.prisma.projectTechnology.findMany({
        where: {
            projectId: Project === null || Project === void 0 ? void 0 : Project.id
        }
    });
    if (!Project) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the Project");
    }
    return Object.assign(Object.assign({}, Project), { technologies });
});
const updateProjectIntoDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const Project = yield global_1.prisma.project.findUnique({ where: { id: _id } });
    if (!Project) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the Project");
    }
    const updatedProject = yield global_1.prisma.project.update({
        where: {
            id: _id
        },
        data: payload
    });
    return updatedProject;
});
const getAllProjectsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield global_1.prisma.project.findMany({
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
});
const deleteProjectFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield global_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const Project = yield global_1.prisma.project.findUnique({
            where: { id: _id }, include: {
                projectTechnology: true,
                projectLink: true,
            }
        });
        if (!Project) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the Project");
        }
        for (const link of Project.projectLink || []) {
            yield transactionClient.projectLink.delete({
                where: {
                    id: link.id
                }
            });
        }
        for (const technology of Project.projectTechnology || []) {
            yield transactionClient.projectTechnology.delete({
                where: {
                    id: technology.id
                }
            });
            // console.log(technology)
        }
        const result = yield transactionClient.project.delete({
            where: {
                id: _id
            }
        });
        return result;
    }));
    return result;
});
exports.ProjectServices = {
    createProjectIntoDB,
    deleteProjectFromDB,
    getAllProjectsFromDB,
    updateProjectIntoDB,
    getProjectFromDB
};
