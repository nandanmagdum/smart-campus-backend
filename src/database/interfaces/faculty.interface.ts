import { Document } from "mongoose";

export interface IFacultyInterface extends Document {
    faculty_id: string,
    designation: string,
    department: string
};