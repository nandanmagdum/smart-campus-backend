import { Router } from "express";
import { uploadProfilePictureController } from "../controllers/image.controller";

const imageRouter = Router();

imageRouter.post("/user/profile", uploadProfilePictureController);

export default imageRouter;