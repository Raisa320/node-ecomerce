import { Router } from "express";
import * as Controller from "./controller";

const authRouter: Router = Router();

authRouter.post("/login", Controller.login);
authRouter.post("/register", Controller.register);
authRouter.post("/refreshtoken", Controller.refreshToken);
authRouter.put("/logout", Controller.logout);

export default authRouter;
