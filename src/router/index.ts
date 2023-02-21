import { CategoryRouter, DiscountRouter, ProductRouter } from "../components";

const routes = [
  ["categories", CategoryRouter],
  ["products", ProductRouter],
  ["discounts", DiscountRouter],
];

export const router = (app: any) => {
  routes.forEach(([path, controller]) => {
    app.use(`/api/v1/${path}`, controller);
  });
};
