import { Request, Response } from "express";
import { IUserInterface } from "../database/interfaces/user.interface";
import userModel from "../database/models/user.model";
import {  loginUserRepo, registerUserRepo } from "../repositories/auth.repository";
import { generateOTP, verifyOTPRepo } from "../services/otp.service";
import { sendMailWithOTP, transporter } from "../services/mail_service";

export const registerUserController = async(req:Request, res:Response) => {
    const body = req.body;
    try {
        const user = await registerUserRepo(body);
        if(!user){
            res.status(301).json({"error": "Client Side Error"});
        } else {
            res.status(200).json({"New User" : user});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({"error": error});
    }
}

export const sendOTPController = async(req:Request, res:Response) => {
    const {email} = req.body;
    try {
        const OTP = await generateOTP(email);
        if(!OTP){
            res.status(500).json({"error": "error generating OTP"});
        }  
        // send mail
        const status = await sendMailWithOTP(email, OTP);
        if(status === "error"){
            res.status(500).json({"Error": "Error sending mail"});
        }
        else {
            res.status(200).json({"otp": OTP});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({"error": error});
    }
}

export const verifyOTPController = async(req:Request, res: Response) => {
    const {email, otp} = req.body;
    const verificationStatus = await verifyOTPRepo(email, otp);
    if(verificationStatus === "success"){
        res.status(200).json({"OTP status" : "Verified ! successfully"});
    } else {
        res.status(500).json({"OTP status error": verificationStatus});
    }
}

export const loginUserController = async(req:Request, res:Response) => {
    const {email, password} = req.body;
    try {
        const tokenOrError = await loginUserRepo(email, password);
        console.log(typeof tokenOrError);
        if(tokenOrError instanceof Error){
            return res.status(500).json({"Error logining user": tokenOrError});
        } else {
            return res.status(200).json({"Token" : tokenOrError});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({"error": error});
    }
}