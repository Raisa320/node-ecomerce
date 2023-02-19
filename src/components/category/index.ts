import { Router } from "express";
import * as Controller from "./controller";

const categoryRouter: Router = Router();

categoryRouter.post("/", Controller.store);
categoryRouter.get("/", Controller.findAll);
categoryRouter.get("/:idCategory", Controller.getOne);
categoryRouter.put("/:idCategory", Controller.update);
categoryRouter.delete("/:idCategory", Controller.remove);

export default categoryRouter;