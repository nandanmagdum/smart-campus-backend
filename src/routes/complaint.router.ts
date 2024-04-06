import { Router } from "express";
import { addActionController, addSolutionController, changeStatusController, closeComplaintController, createComplaintController, deleteComplaintController, getAllComplaintsController, getComplaintController, updateComplaintController } from "../controllers/complaint.controller";

const complaintRouter = Router();

complaintRouter.get("/all", getAllComplaintsController);
// complaintRouter.get("/member/:id", getMemberInformationController);
complaintRouter.get("/:id", getComplaintController);

complaintRouter.post("/", createComplaintController);

complaintRouter.patch("/", updateComplaintController);
complaintRouter.patch("/status/:id", changeStatusController);
complaintRouter.patch("/add_action", addActionController);
complaintRouter.patch("/add_solution", addSolutionController);

complaintRouter.patch("/closeIssue/:id", closeComplaintController);

complaintRouter.delete("/:id", deleteComplaintController);

export default complaintRouter;