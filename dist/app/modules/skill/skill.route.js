"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const skill_controller_1 = require("./skill.controller");
const router = express_1.default.Router();
router.get('/', skill_controller_1.SkillControllers.getAllSkills);
router.post('/', (0, auth_1.default)(client_1.UserRole.ADMIN), skill_controller_1.SkillControllers.createSkill);
router.patch('/:SkillId', (0, auth_1.default)(client_1.UserRole.ADMIN), skill_controller_1.SkillControllers.updateSkill);
router.get('/:SkillId', skill_controller_1.SkillControllers.getSkill);
router.delete('/:SkillId', (0, auth_1.default)(client_1.UserRole.ADMIN), skill_controller_1.SkillControllers.deleteSkill);
exports.SkillRoutes = router;
