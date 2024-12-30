"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
router.get('/', blog_controller_1.BlogControllers.getAllBlogs);
router.post('/', (0, auth_1.default)(client_1.UserRole.ADMIN), blog_controller_1.BlogControllers.createBlog);
router.patch('/:BlogId', (0, auth_1.default)(client_1.UserRole.ADMIN), blog_controller_1.BlogControllers.updateBlog);
router.get('/:BlogId', blog_controller_1.BlogControllers.getBlog);
router.delete('/:BlogId', (0, auth_1.default)(client_1.UserRole.ADMIN), blog_controller_1.BlogControllers.deleteBlog);
exports.BlogRoutes = router;
