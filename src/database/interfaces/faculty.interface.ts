import { Document } from "mongoose";

export interface IFacultyInterface extends Document {
    email: string,
    designation: string,
    department: string
};