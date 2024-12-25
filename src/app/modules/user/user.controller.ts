import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createAdminIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});


const getMyInfo = catchAsync(async (req, res) => {
  const result = await UserServices.getMyInfoFromDB(req)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
})


export const UserControllers = {
  createAdmin,
  getMyInfo,
 
};
