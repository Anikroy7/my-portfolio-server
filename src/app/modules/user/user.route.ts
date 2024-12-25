import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createAdminValidationSchema } from "./user.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post('/create-admin',
  // auth(UserRole.ADMIN),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
)

router.get('/me',
  auth('ADMIN'),
  UserControllers.getMyInfo
)


export const UsersRoutes = router;
