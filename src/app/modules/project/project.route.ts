import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ProjectControllers } from "./project.controller";

const router = express.Router();

router.get('/', ProjectControllers.getAllProjects)
router.post('/', auth(UserRole.ADMIN), ProjectControllers.createProject)
router.patch('/:ProjectId', auth(UserRole.ADMIN), ProjectControllers.updateProject)
router.get('/:ProjectId', ProjectControllers.getProject)
router.delete('/:ProjectId', auth(UserRole.ADMIN), ProjectControllers.deleteProject)

export const ProjectRoutes = router;
