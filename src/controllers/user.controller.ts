import { Request, Response } from "express";
import { createFacultyRepo, createStudentRepo, deleteUserRepo, getAllFacultiesRepo, getAllStudentsRepo, getAllUsersRepo} from "../repositories/user.repository";
import { combineArrays} from "../services/combine_arrays";

export const createStudentController = async(req:Request, res:Response) => {
    const data = req.body;
    try {
        const user = await createStudentRepo(data);
        if(!user){
            return res.status(500).json({"Error": "Error Registering Student data, please try again"});
        }
        return res.status(200).json({"User": user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const createFacultyController = async(req:Request, res:Response) => {
    const data = req.body;
    try {
        const user = await createFacultyRepo(data);
        if(!user){
            return res.status(500).json({"Error": "Error Registering Faulty data, please try again"});
        }
        return res.status(200).json({"Faculty": user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getAllUsersController = async(req:Request, res:Response) => {
    try {
        const allusers = await getAllUsersRepo();
        const allStudents = await getAllStudentsRepo();
        const allFaculties = await getAllFacultiesRepo();
        if(!allusers || !allStudents || !allFaculties){
            return res.status(500).json({"Error" : "Users not found"});
        }
        // combine all objects
        const SUPER_DATA = await combineArrays(allusers, allStudents, allFaculties);
        return res.status(200).json({"All Users": SUPER_DATA});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getAllStudentsController = async(req:Request, res:Response) => {
    try {
        const allStudents = await getAllStudentsRepo();
        if(!allStudents){
            return res.status(500).json({"Error": "Error getting all students"});
        }
        return res.status(200).json({"All Students":allStudents});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getAllFacultiesController = async(req:Request, res:Response) => {
    try {
        const allFaculties = await getAllFacultiesRepo();
        if(!allFaculties){
            return res.status(500).json({"Error": "Error getting all Faculties"});
        }
        return res.status(200).json({"All Faculties":allFaculties});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const deleteUserController = async(req:Request, res:Response) => {
    const user_id = req.params.id;
    try {
        const deletedUser = await deleteUserRepo(user_id);
        if(!deletedUser){
            return res.status(500).json({"Error": "Deleting the user"});
        }
        return res.status(200).json({"Success": "User deleted succesfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}