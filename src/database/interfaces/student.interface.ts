import { Document } from "mongoose";

export interface IStudentInterface extends Document {
    student_id: string,
    year: string,
    semester: string,
    department: string,
    program : string
};