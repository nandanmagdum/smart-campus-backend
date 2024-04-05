import { Router } from "express";
import { createFacultyController, createStudentController, deleteUserController, getAllFacultiesController, getAllStudentsController, getAllUsersController } from "../controllers/user.controller";
import { uploadProfilePictureController } from "../controllers/image.controller";

const userRouter = Router();

userRouter.post("/student", createStudentController);
userRouter.post("/faculty", createFacultyController);

userRouter.get("/all", getAllUsersController);
userRouter.get("/student", getAllStudentsController);
userRouter.get("/faculty", getAllFacultiesController);

userRouter.delete('/:id', deleteUserController);
userRouter.patch("/upload_profile_pic", uploadProfilePictureController);

export default userRouter;