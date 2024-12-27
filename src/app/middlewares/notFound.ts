/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url)
   res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Api not found!",
    error: "",
  });
};

export default notFound;

