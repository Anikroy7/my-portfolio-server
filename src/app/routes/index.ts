import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UsersRoutes } from "../modules/user/user.route";
import { SkillRoutes } from "../modules/skill/skill.route";




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

    
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
