import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UsersRoutes } from "../modules/user/user.route";
import { SkillRoutes } from "../modules/skill/skill.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { ExperienceRoutes } from "../modules/experience/experience.route";
import { ProjectRoutes } from "../modules/project/project.route";




const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UsersRoutes,
  },
  {
    path: "/skills",
    route: SkillRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/experiences",
    route: ExperienceRoutes,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },


];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
