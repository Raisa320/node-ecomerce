import {
  CategoryRouter,
  CustomerRouter,
  PaymentRouter,
  DiscountRouter,
  InventoryRouter,
  ProductRouter,
  AuthRouter,
} from "../components";
import { RolRouter } from "../components";
import { UserRouter } from "../components";

const routes = [
  ["categories", CategoryRouter],
  ["products", ProductRouter],
  ["discounts", DiscountRouter],
  ["inventories", InventoryRouter],
  ["roles", RolRouter],
  ["users", UserRouter],
  ["customers", CustomerRouter],
  ["payments", PaymentRouter],
  ["auth", AuthRouter],
];

export const router = (app: any) => {
  routes.forEach(([path, controller]) => {
    app.use(`/api/v1/${path}`, controller);
  });
};
