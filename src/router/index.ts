import {
  CategoryRouter,
  DiscountRouter,
  InventoryRouter,
  ProductRouter,
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
];

export const router = (app: any) => {
  routes.forEach(([path, controller]) => {
    app.use(`/api/v1/${path}`, controller);
  });
};
