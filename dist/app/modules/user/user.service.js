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
exports.UserServices = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const global_1 = require("../../types/global");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createAdminIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, adminData = __rest(payload, ["password"]);
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10);
    const userData = {
        email: adminData.email,
        password: hashedPassword,
        role: client_1.UserRole.ADMIN
    };
    const result = yield global_1.prisma.$transaction((transictionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transictionClient.user.create({
            data: userData
        });
        const createdAdminData = yield transictionClient.admin.create({
            data: adminData
        });
        return createdAdminData;
    }));
    return result;
});
const getMyInfoFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const role = payload.user.role;
    switch (role) {
        case client_1.UserRole.ADMIN:
            return yield global_1.prisma.admin.findUniqueOrThrow({ where: { email: payload.user.email } });
        default:
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User not found');
    }
});
exports.UserServices = {
    createAdminIntoDB,
    getMyInfoFromDB,
};
