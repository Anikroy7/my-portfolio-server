"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        statusCode: data === null || data === void 0 ? void 0 : data.statusCode,
        success: data.success,
        message: data.message,
        data: data.data,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
    });
};
exports.default = sendResponse;
