import { Router , Request, Response} from "express";
import authRouter from "./auth.router";
import lostfoundRouter from "./lost_found.router";
import userRouter from "./user.route";
import eventRouter from "./event.router";
import imageRouter from "./image.router";
import complaintRouter from "./complaint.router";

const router = Router();

router.get("/", (req:Request, res:Response) => {
    res.status(200).json({"Server":"is live" });
});

router.use("/auth", authRouter);
router.use("/lost_found", lostfoundRouter);
router.use("/user", userRouter);
router.use("/event", eventRouter);
router.use("/complaint", complaintRouter);

export default router;