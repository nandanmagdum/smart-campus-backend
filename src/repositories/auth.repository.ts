import mongoose from "mongoose";
import { IUserInterface } from "../database/interfaces/user.interface";
import userModel from "../database/models/user.model";
import { threadId } from "worker_threads";
import { hashPassword } from "../services/hash_password";
import { generateOTP } from "../services/otp.service";
import { transporter } from "../services/mail_service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const  jwt_screat = process.env.jwt_screat;
if(!jwt_screat){
    console.error("jwt screat key not found !");
    process.exit(1);
}
// call only when otp matches
export const registerUserRepo = async(user:IUserInterface):Promise<IUserInterface | string> => {

    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    console.log("Hashed password ", hashedPassword);
    try {
        const registerUser = await userModel.create(user);
        if(!registerUser){
            return "Error Registering New User";
        } else {
            return registerUser;
        }
    } catch (error) {
        console.error(error);
        return "Internal Server Error for registering new user";
    }
}

export const loginUserRepo = async(email:string, password:string):Promise<string | Error> => {
    try {
        const user = await userModel.findOne({email: email});
        if(!user){
            return Error("User not found !");
        }
        // check if password match
        const ispasswordSame = await bcrypt.compare(password, user.password);
        if(!ispasswordSame){
            return Error("Password do not match !");
        }
        // generate jwt token
        const token = await jwt.sign({username: user.username, email: user.email, userType: user.userType, firstName: user.firstName, lastName: user.lastName}, jwt_screat, {expiresIn: '7d'});
        if(!token){
            return Error("Error generating the token !");
        }
        return token;

    } catch (error) {
        return Error("Internal Server Error");
    }
}

