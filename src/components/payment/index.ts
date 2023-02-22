import { Router } from "express";
import * as Controller from "./controller";

const paymentRouter: Router = Router();

paymentRouter.post("/", Controller.store);
paymentRouter.get("/", Controller.findAll);
paymentRouter.get("/:idPayment", Controller.getOne);
paymentRouter.put("/:idPayment", Controller.update);
paymentRouter.delete("/:idPayment", Controller.remove);
export default paymentRouter;
