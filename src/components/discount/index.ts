import { Router } from "express";
import * as Controller from "./controller";

const discountRouter: Router = Router();

discountRouter.post("/", Controller.store);
discountRouter.get("/", Controller.findAll);
discountRouter.get("/:idDiscount", Controller.getOne);
discountRouter.put("/:idDiscount", Controller.update);
discountRouter.delete("/:idDiscount", Controller.remove);

export default discountRouter;
