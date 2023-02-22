import { Router } from "express";
import * as Controller from "./controller";

const customerRouter: Router = Router();

customerRouter.post("/", Controller.store);
customerRouter.get("/", Controller.findAll);
customerRouter.get("/:idCustomer", Controller.getOne);
customerRouter.put("/:idCustomer", Controller.update);
customerRouter.delete("/:idCustomer", Controller.remove);

// customerRouter.post("/storeAddress/:idCustomer", Controller.storeAddress);

export default customerRouter;

// const addressRouter: Router = Router();

// addressRouter.get("/", Controller.findAllAddresses);
// addressRouter.get("/:idCustomerAddress", Controller.getOneAddress);
// addressRouter.put("/:idCustomerAddress", Controller.updateAddress);
// addressRouter.delete("/:idCustomerAddress", Controller.removeAddress);

// export default addressRouter;