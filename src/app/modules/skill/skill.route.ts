import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { SkillControllers } from "./skill.controller";

const router = express.Router();

router.get('/', SkillControllers.getAllSkills)
router.post('/', auth(UserRole.ADMIN), SkillControllers.createSkill)
router.patch('/:SkillId', auth(UserRole.ADMIN), SkillControllers.updateSkill)
router.get('/:SkillId', SkillControllers.getSkill)
router.delete('/:SkillId', auth(UserRole.ADMIN), SkillControllers.deleteSkill)

export const SkillRoutes = router;
