import { Router } from "express";
import * as Controller from "./controller";
import { isAuthenticated } from "../../middlewares/JwtMiddleware";

const customerRouter: Router = Router();

customerRouter.post("/", Controller.create);
customerRouter.get("/", isAuthenticated, Controller.findAll);
customerRouter.get("/:idCustomer", Controller.getOne);
customerRouter.put("/:idCustomer", Controller.update);
customerRouter.delete("/:idCustomer", Controller.remove);

export default customerRouter;
