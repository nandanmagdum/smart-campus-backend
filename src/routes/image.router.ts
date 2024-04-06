import { Router } from "express";
import { uploadEventPictureController, uploadItemImageController, uploadProfilePictureController } from "../controllers/image.controller";

const imageRouter = Router();

imageRouter.post("/user/profile", uploadProfilePictureController);
imageRouter.post("/lost_found/image", uploadItemImageController);
imageRouter.post("/user/profile", uploadEventPictureController);


export default imageRouter;