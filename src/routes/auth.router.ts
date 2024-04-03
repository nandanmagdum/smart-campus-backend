import {Router} from "express";
import { loginUserController, registerUserController, sendOTPController, verifyOTPController } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register" , registerUserController);

authRouter.post("/send_otp", sendOTPController);

authRouter.post("/verify_otp", verifyOTPController);

authRouter.post("/login", loginUserController);

export default authRouter;