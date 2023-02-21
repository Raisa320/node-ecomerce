import {
  CategoryRouter,
  DiscountRouter,
  InventoryRouter,
  ProductRouter,
} from "../components";

const routes = [
  ["categories", CategoryRouter],
  ["products", ProductRouter],
  ["discounts", DiscountRouter],
  ["inventories", InventoryRouter],
];

export const router = (app: any) => {
  routes.forEach(([path, controller]) => {
    app.use(`/api/v1/${path}`, controller);
  });
};
