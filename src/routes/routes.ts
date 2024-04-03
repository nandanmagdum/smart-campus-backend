import { Router , Request, Response} from "express";
import authRouter from "./auth.router";

const router = Router();

router.get("/", (req:Request, res:Response) => {
    res.status(200).json({"Server":"is live" });
});

router.use("/auth", authRouter);

export default router;