import { Document } from "mongoose";

export interface IStudentInterface extends Document {
    student_id: string,
    passout_year: number,
    program: string,
    department: string,
};