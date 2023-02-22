import { CategoryRouter, CustomerRouter, PaymentRouter } from "../components";


const routes = [
  ["categories", CategoryRouter],
  ["customers", CustomerRouter],
  ["payments", PaymentRouter]
];

export const router = (app: any) => {
  routes.forEach(([path, controller]) => {
    app.use(`/api/v1/${path}`,controller)
  });
};
