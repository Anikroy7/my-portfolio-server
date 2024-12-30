"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-admin', 
// auth(UserRole.ADMIN),
(0, validateRequest_1.default)(user_validation_1.createAdminValidationSchema), user_controller_1.UserControllers.createAdmin);
router.get('/me', (0, auth_1.default)('ADMIN'), user_controller_1.UserControllers.getMyInfo);
exports.UsersRoutes = router;
