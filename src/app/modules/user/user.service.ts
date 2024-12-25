import { UserRole, UserStatus } from "@prisma/client"
import bcyrpt from 'bcrypt'
import { prisma } from "../../types/global";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";


const createAdminIntoDB = async (payload: any) => {
    const { password, ...adminData } = payload;
    const hashedPassword: string = await bcyrpt.hash(payload.password, 10);
    const userData = {
        email: adminData.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }
    const result = await prisma.$transaction(async (transictionClient) => {
        await transictionClient.user.create({
            data: userData
        })

        const createdAdminData = await transictionClient.admin.create({
            data: adminData
        })
        return createdAdminData
    })

    return result
}

const getMyInfoFromDB = async (payload: any) => {
    const role = payload.user.role;
    switch (role) {
        case UserRole.ADMIN:
            return await prisma.admin.findUniqueOrThrow({ where: { email: payload.user.email } })
        case UserRole.CUSTOMER:
            return await prisma.customer.findUniqueOrThrow({ where: { email: payload.user.email } })
        case UserRole.VENDOR:
            return await prisma.vendor.findUniqueOrThrow({ where: { email: payload.user.email } })
        default:
            throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
    }
}


export const UserServices = {
    createAdminIntoDB,
    getMyInfoFromDB,
   
}