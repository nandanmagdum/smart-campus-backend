import { Router } from "express";
import { createFacultyController, createStudentController, deleteUserController, getAllFacultiesController, getAllStudentsController, getAllUsersController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/student", createStudentController);
userRouter.post("/faculty", createFacultyController);

userRouter.get("/all", getAllUsersController);
userRouter.get("/student", getAllStudentsController);
userRouter.get("/faculty", getAllFacultiesController);

userRouter.delete('/:id', deleteUserController);

export default userRouter;