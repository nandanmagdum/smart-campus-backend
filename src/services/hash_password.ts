import bcrypt from "bcrypt";
import { PassThrough } from "stream";

export const hashPassword = async(password:string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export const comparePasswords = async(password:string, hashedPassword:string) => {
    const status = await bcrypt.compare(password, hashedPassword);
    return status;
}