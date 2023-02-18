import { CategoryRouter } from "../components";


const routes = [
  ["categories", CategoryRouter],
];

export const router = (app: any) => {
  routes.forEach(([path, controller]) => {
    app.use(`/api/v1/${path}`,controller)
  });
};
