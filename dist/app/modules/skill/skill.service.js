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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const global_1 = require("../../types/global");
;
const createSkillIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newSkill = yield global_1.prisma.$transaction((prismaTransication) => __awaiter(void 0, void 0, void 0, function* () {
        const technology = yield prismaTransication.technology.create({
            data: payload
        });
        yield prismaTransication.skill.create({
            data: {
                technologyId: technology.id
            }
        });
        return technology;
    }));
    return newSkill;
});
const getSkillFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const Skill = yield global_1.prisma.skill.findUnique({ where: { id: _id } });
    if (!Skill) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the Skill");
    }
    return Skill;
});
const updateSkillIntoDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const Skill = yield global_1.prisma.skill.findUnique({ where: { id: _id } });
    if (!Skill) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the Skill");
    }
    const updatedSkill = yield global_1.prisma.skill.update({
        where: {
            id: _id
        },
        data: payload
    });
    return updatedSkill;
});
const getAllSkillsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const skils = yield global_1.prisma.skill.findMany({
        where: {
            isDeleted: false
        },
        include: {
            technology: true
        }
    });
    return skils;
});
const deleteSkillFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield global_1.prisma.$transaction((transcationClient) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedSkill = yield transcationClient.skill.delete({
            where: {
                id: _id
            }
        });
        const deleteTechnology = yield transcationClient.technology.delete({
            where: {
                id: deletedSkill.technologyId
            }
        });
        return deleteTechnology;
    }));
    return result;
});
exports.SkillServices = {
    createSkillIntoDB,
    deleteSkillFromDB,
    getAllSkillsFromDB,
    updateSkillIntoDB,
    getSkillFromDB
};
