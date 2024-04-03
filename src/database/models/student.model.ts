import mongoose, { Document, Schema } from "mongoose";
import { IStudentInterface } from "../interfaces/student.interface";

const studentSchema = new Schema<IStudentInterface>({
    student_id: {type: String, required: true, unique: true},
    year: {type: String, required: true},
    semester: {type: String, required: true},
    department: {type: String, required: true},
    program: {type: String, required: true}
});

const studentModel = mongoose.model<IStudentInterface>("studentModel", studentSchema);

export default studentModel;