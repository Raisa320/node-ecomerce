import { CategoryRouter, ProductRouter } from "../components";

const routes = [
  ["categories", CategoryRouter],
  ["products", ProductRouter],
];

export const router = (app: any) => {
  routes.forEach(([path, controller]) => {
    app.use(`/api/v1/${path}`, controller);
  });
};
