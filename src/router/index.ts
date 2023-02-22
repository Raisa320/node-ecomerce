import { CategoryRouter } from "../components";
import { RolRouter } from "../components";
import { UserRouter } from "../components";


const routes = [
  ["categories", CategoryRouter],
  ["roles", RolRouter],
  ["users", UserRouter],
];

export const router = (app: any) => {
  routes.forEach(([path, controller]) => {
    app.use(`/api/v1/${path}`,controller)
  });
};
