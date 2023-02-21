import { Router } from "express";
import * as Controller from "./controller";

const inventoryRouter: Router = Router();

inventoryRouter.post("/", Controller.store);
inventoryRouter.get("/", Controller.findAll);
inventoryRouter.get("/:idInventory", Controller.getOne);
inventoryRouter.put("/:idInventory", Controller.update);
inventoryRouter.delete("/:idInventory", Controller.remove);

export default inventoryRouter;
