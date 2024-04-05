import { Router } from "express";
import { uploadProfilePictureController } from "../controllers/image.controller";

const imageRouter = Router();

imageRouter.patch("/upload_profile_pic", uploadProfilePictureController);

export default imageRouter;