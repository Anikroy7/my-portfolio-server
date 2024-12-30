"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const skill_route_1 = require("../modules/skill/skill.route");
const blog_route_1 = require("../modules/blog/blog.route");
const experience_route_1 = require("../modules/experience/experience.route");
const project_route_1 = require("../modules/project/project.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/users",
        route: user_route_1.UsersRoutes,
    },
    {
        path: "/skills",
        route: skill_route_1.SkillRoutes,
    },
    {
        path: "/blogs",
        route: blog_route_1.BlogRoutes,
    },
    {
        path: "/experiences",
        route: experience_route_1.ExperienceRoutes,
    },
    {
        path: "/projects",
        route: project_route_1.ProjectRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
