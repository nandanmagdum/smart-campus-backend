import { updateSourceFile } from "typescript";
import { IFacultyInterface } from "../database/interfaces/faculty.interface";
import { IStudentInterface } from "../database/interfaces/student.interface";
import { IUserInterface } from "../database/interfaces/user.interface";
import { getAllFacultiesRepo, getAllStudentsRepo, getAllUsersRepo } from "../repositories/user.repository";
  
export const combineArrays = async(allUsers:IUserInterface[], allStudents:IStudentInterface[], allFaculties:IFacultyInterface[]) => {
    // Validate input (optional but recommended)
    if (!Array.isArray(allUsers) || !Array.isArray(allStudents) || !Array.isArray(allFaculties)) {
        throw new Error('Invalid input: allUsers, allStudents, and allFaculties must be arrays.');
    }

    // Create a new array to store the combined user objects
    const combinedUsers = [];

    // combine users and students
    for(const user of allUsers){
        for(const student of allStudents){
            if(user._id == student.email){
                const newUser:any = {user};
                newUser['student_details'] = student;
                combinedUsers.push(newUser);
                break;
            }
        }
    }

    // combine users and faculties
    for(const user of allUsers){
        for(const faculty of allFaculties){
            if(user._id == faculty.email){
                const newUser:any = {user};
                newUser['faculty_details'] = faculty;
                combinedUsers.push(newUser);
                break;
            }
        }
    }
    return combinedUsers;
}