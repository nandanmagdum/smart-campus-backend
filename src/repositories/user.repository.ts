import { IFacultyInterface } from "../database/interfaces/faculty.interface";
import { IStudentInterface } from "../database/interfaces/student.interface";
import { IUserInterface } from "../database/interfaces/user.interface";
import facultyModel from "../database/models/faculty.model";
import studentModel from "../database/models/student.model";
import userModel from "../database/models/user.model";

export const createStudentRepo = async(data:IStudentInterface):Promise<IStudentInterface | null> => {
    try {
        const user = await studentModel.create(data);
        if(!user){
            return null;
        }
        return user;
    } catch (error) {   
        console.error(error);
        return null;
    }
}

export const createFacultyRepo = async(data:IFacultyInterface):Promise<IFacultyInterface | null> => {
    try {
        const user = await facultyModel.create(data);
        if(!user){
            return null;
        }
        return user;
    } catch (error) {   
        console.error(error);
        return null;
    }
}

export const getAllUsersRepo = async():Promise<IUserInterface[] | null > => {
    try {
        const allUsers = await userModel.find({});
        if(!allUsers){
            return null;
        }
        return allUsers;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getAllStudentsRepo = async():Promise<IStudentInterface[] | null> => {
    try {
        const allStudents = await studentModel.find({});
        if(!allStudents){
            return null;
        }
        return allStudents;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getAllFacultiesRepo = async():Promise<IFacultyInterface[] | null> => {
    try {
        const allFaculties = await facultyModel.find({});
        if(!allFaculties){
            return null;
        } 
        return allFaculties;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteUserRepo = async(id:string):Promise<boolean> => {
    try {
        const user = await userModel.findOne({_id: id});
        if(!user){
            return false;
        }
        const userType = user.userType;
        const deletedUser = await userModel.deleteOne({_id: id});
        if(userType === "student"){
            const deletedStudent = await studentModel.deleteOne({student_id: id});
            if(!deletedStudent) return false;
            return true;
        } else {
            const deletedFaculty = await facultyModel.deleteOne({faculty_id: id});
            if(!deletedFaculty) return false;
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}