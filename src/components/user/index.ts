import { Router } from "express";
import * as Controller from "./controller";

const userRouter: Router = Router();

userRouter.post("/", Controller.store);
userRouter.get("/", Controller.findAll);
userRouter.get("/:idUser", Controller.getOne);
userRouter.put("/:idUser", Controller.update);
userRouter.delete("/:idUser", Controller.remove);

export default userRouter;