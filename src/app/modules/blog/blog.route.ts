import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { BlogControllers } from "./blog.controller";

const router = express.Router();

router.get('/', BlogControllers.getAllBlogs)
router.post('/', auth(UserRole.ADMIN), BlogControllers.createBlog)
router.patch('/:BlogId', auth(UserRole.ADMIN), BlogControllers.updateBlog)
router.get('/:BlogId', BlogControllers.getBlog)
router.delete('/:BlogId', auth(UserRole.ADMIN), BlogControllers.deleteBlog)

export const BlogRoutes = router;
