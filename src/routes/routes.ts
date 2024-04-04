import { Router , Request, Response} from "express";
import authRouter from "./auth.router";
import lostfoundRouter from "./lost_found.router";

const router = Router();

router.get("/", (req:Request, res:Response) => {
    res.status(200).json({"Server":"is live" });
});

router.use("/auth", authRouter);
router.use("/lost_found", lostfoundRouter);

export default router;