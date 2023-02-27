import { Router } from "express";
import * as Controller from "./controller";

const customerRouter: Router = Router();

customerRouter.post("/", Controller.store);
customerRouter.get("/", Controller.findAll);
customerRouter.get("/:idCustomer", Controller.getOne);
customerRouter.put("/:idCustomer", Controller.update);
customerRouter.delete("/:idCustomer", Controller.remove);

export default customerRouter;
