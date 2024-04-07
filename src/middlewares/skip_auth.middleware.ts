import {Request, Response, NextFunction} from "express";
import { authenticateUser } from "./auth.middleware";

export const skipAuth = async(req:Request, res:Response, next:NextFunction) => {
    console.log("req path = ", req.path);
    if(req.path == "/api/v1/auth/register" || req.path == "/api/v1/auth/login" || 
        req.path == "/api/v1/auth/send_otp" || req.path === "/api/v1/auth/verify_otp" ||
        req.path === "/api/v1/" || req.path === "/api/v1/user/student" || req.path === "/api/v1/user/faculty" 
    ){
    console.log("++++++++++++++++",req.path);

        next();
    }else {
    console.log("----------------------",req.path);

        authenticateUser(req, res, next);
    }
}