import { Router } from "express";
import * as Controller from "./controller";

const rolRouter: Router = Router();

rolRouter.post("/", Controller.store);
rolRouter.get("/", Controller.findAll);
rolRouter.get("/:idRol", Controller.getOne);
rolRouter.put("/:idRol", Controller.update);
rolRouter.delete("/:idRol", Controller.remove);

export default rolRouter;