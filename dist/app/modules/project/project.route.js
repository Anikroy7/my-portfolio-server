"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const project_controller_1 = require("./project.controller");
const router = express_1.default.Router();
router.get('/', project_controller_1.ProjectControllers.getAllProjects);
router.post('/', (0, auth_1.default)(client_1.UserRole.ADMIN), project_controller_1.ProjectControllers.createProject);
router.patch('/:ProjectId', (0, auth_1.default)(client_1.UserRole.ADMIN), project_controller_1.ProjectControllers.updateProject);
router.get('/:ProjectId', project_controller_1.ProjectControllers.getProject);
router.delete('/:ProjectId', (0, auth_1.default)(client_1.UserRole.ADMIN), project_controller_1.ProjectControllers.deleteProject);
exports.ProjectRoutes = router;
