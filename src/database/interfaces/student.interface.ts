import { Document } from "mongoose";

export interface IStudentInterface extends Document {
    email: string,
    passout_year: number,
    program: string,
    department: string,
};