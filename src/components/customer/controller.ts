import type { Request, Response } from "express";
import prisma from "../../datasource";
import { Prisma, Customer } from ".prisma/client";
import { failure, success } from "../../response";
import { encriptPass } from "../../utils/bcrypt";

// Create a new function and pass the parameters onto the validator
const createCustomer = (data: any) => {
  if (data.address) {
    return Prisma.validator<Prisma.CustomerCreateInput>()({
      username: data.username,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
      telephone: data.telephone,
      address: {
        createMany: {
          data: data.address,
        },
      },
    });
  } else {
    return Prisma.validator<Prisma.CustomerCreateInput>()({
      username: data.username,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
      telephone: data.telephone,
    });
  }
};

export const store = async (req: Request, _res: Response) => {
  try {
    const data = req.body;
    const hashedPassword = await encriptPass(data.password);
    data.password = hashedPassword;

    const customer = await prisma.customer.create({
      data: createCustomer(data),
    });
    return customer;
  } catch (error: any) {
    return error;
  }
};
export const create = async (req: Request, res: Response) => {
  try {
    success({ res, data: await store(req, res) });
  } catch (error) {
    failure({ res, message: await store(req, res) });
  }
};
export const findAll = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const customers = await prisma.customer.findMany({});

    return success({
      res,
      data: customers,
    });
  } catch (error: any) {
    return failure({
      res,
      message: error,
    });
  }
};

export const getOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idCustomer = Number(req.params.idCustomer);
    const customer = await prisma.customer.findUnique({
      where: {
        id: idCustomer,
      },
      include: {
        address: true,
      },
    });
    return success({
      res,
      data: customer,
    });
  } catch (error: any) {
    return failure({
      res,
      message: error,
    });
  }
};
export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idCustomer = Number(req.params.idCustomer);

    const customerUpdated = prisma.customer.update({
      where: { id: idCustomer },
      data: createCustomer(req.body),
    });

    const customer = prisma.customer.findUnique({
      where: {
        id: idCustomer,
      },
    });

    const [_, objectCustomer] = await prisma.$transaction([
      customerUpdated,
      customer,
    ]);

    return success({
      res,
      data: objectCustomer,
    });
  } catch (error: any) {
    return failure({
      res,
      message: error,
    });
  }
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idCustomer = Number(req.params.idCustomer);

    await prisma.customer.delete({
      where: { id: idCustomer },
    });
    return success({
      res,
      data: "Customer delete",
    });
  } catch (error: any) {
    return failure({
      res,
      message: error,
    });
  }
};

export const findCustomerByUsername = (username: any) => {
  const customer = prisma.customer.findFirst({ where: { username } });
  return customer;
};

export const findCustomerByToken = (token: any) => {
  const customer = prisma.customer.findFirst({ where: { id: token.id } });
  return customer;
};
