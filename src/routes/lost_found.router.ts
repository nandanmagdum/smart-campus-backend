import {Router} from "express";
import { claimeAndClosedIssueController, getAllClosedIssuesController, getAllItemsController,  getFoundItemsRaisedController, getFoundItemsUnRaisedController, getItemController, getLostItemsController, itemIsMineController, lostItemFoundController, newItemFoundController, raiseLostController, uploadItemImageController } from "../controllers/lost_found.controller";

const lostfoundRouter = Router();

lostfoundRouter.post("/raise_lost", raiseLostController);

lostfoundRouter.post("/lost_item_found", lostItemFoundController);

lostfoundRouter.post("/claim", claimeAndClosedIssueController);

lostfoundRouter.post("/new_item_found", newItemFoundController);

lostfoundRouter.post("/item_is_mine", itemIsMineController);

lostfoundRouter.get("/all", getAllItemsController);
lostfoundRouter.get("/lost", getLostItemsController);
lostfoundRouter.get("/found_raised", getFoundItemsRaisedController);
lostfoundRouter.get("/found_unraised", getFoundItemsUnRaisedController);
lostfoundRouter.get("/closed", getAllClosedIssuesController);
lostfoundRouter.get("/:id", getItemController);

lostfoundRouter.patch("/image_upload", uploadItemImageController);


export default lostfoundRouter;