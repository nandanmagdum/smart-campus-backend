import { Router } from "express";
import { acceptEventController, addInterestedPersonController, markAsDoneController, rejectEventController, requestEventController, updateEventController, uploadEventPosterController } from "../controllers/event.controller";
import { getAllEventsController, getEventBYDateController, getEventController, getFutureEventsController, getPastEventsContoller, getRequestedEventsController, getUsersEventsContoller } from "../controllers/user.controller";

const eventRouter = Router();

eventRouter.post("/request", requestEventController);
eventRouter.post("/accept/:event_id", acceptEventController);
eventRouter.post("/update/:event_id", updateEventController);
eventRouter.post("/reject/:event_id", rejectEventController);
eventRouter.post("/markAsDone/:event_id", markAsDoneController);

eventRouter.get("/all", getAllEventsController);
eventRouter.get("/past", getPastEventsContoller);
eventRouter.get("/future", getFutureEventsController);
eventRouter.get("/requested", getRequestedEventsController);
eventRouter.get("/user/:user_id", getUsersEventsContoller);
eventRouter.get("/date", getEventBYDateController);
eventRouter.get("/:event_id", getEventController);

eventRouter.patch("/", addInterestedPersonController);

eventRouter.patch("/upload_poster", uploadEventPosterController);


export default eventRouter;