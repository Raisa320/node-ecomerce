import { Router } from "express";
import * as Controller from "./controller";

const productRouter: Router = Router();

productRouter.post("/", Controller.store);
productRouter.get("/", Controller.findAll);
productRouter.get("/:idProduct", Controller.getOne);
productRouter.put("/:idProduct", Controller.update);
productRouter.delete("/", Controller.remove);

export default productRouter;
