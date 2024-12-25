import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ExperienceControllers } from "./experience.controller";

const router = express.Router();

router.get('/', ExperienceControllers.getAllExperiences)
router.post('/', auth(UserRole.ADMIN), ExperienceControllers.createExperience)
router.patch('/:ExperienceId', auth(UserRole.ADMIN), ExperienceControllers.updateExperience)
router.get('/:ExperienceId', ExperienceControllers.getExperience)
router.delete('/:ExperienceId', auth(UserRole.ADMIN), ExperienceControllers.deleteExperience)

export const ExperienceRoutes = router;
