"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
//route middleware
app.use("/api/", routes_1.default);
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to my portfolio Server"
    });
});
//Global middleware
app.use(globalErrorHandler_1.default);
//Not Found
app.use(notFound_1.default);
exports.default = app;
