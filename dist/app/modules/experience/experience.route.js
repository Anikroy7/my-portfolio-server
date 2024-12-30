"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const experience_controller_1 = require("./experience.controller");
const router = express_1.default.Router();
router.get('/', experience_controller_1.ExperienceControllers.getAllExperiences);
router.post('/', (0, auth_1.default)(client_1.UserRole.ADMIN), experience_controller_1.ExperienceControllers.createExperience);
router.patch('/:ExperienceId', (0, auth_1.default)(client_1.UserRole.ADMIN), experience_controller_1.ExperienceControllers.updateExperience);
router.get('/:ExperienceId', experience_controller_1.ExperienceControllers.getExperience);
router.delete('/:ExperienceId', (0, auth_1.default)(client_1.UserRole.ADMIN), experience_controller_1.ExperienceControllers.deleteExperience);
exports.ExperienceRoutes = router;
