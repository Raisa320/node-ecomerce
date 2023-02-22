import type { Request, Response } from "express";
import prisma from "../../datasource";
import { failure, success } from "../../response";

export const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = req.body;
    const inventory = await prisma.product_inventory.create({ data });
    return success({
      res,
      status: 201,
      data: inventory,
    });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};

export const findAll = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const inventories = await prisma.product_inventory.findMany({});
    return success({
      res,
      data: inventories,
    });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const getOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idInventory = Number(req.params.idInventory);
    const inventory = await prisma.product_inventory.findUnique({
      where: { id: idInventory },
    });
    return success({ res, data: inventory });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idInventory = Number(req.params.idInventory);

    const inventoryUpdated = prisma.product_inventory.update({
      where: { id: idInventory },
      data: req.body,
    });

    const inventory = prisma.product_inventory.findUnique({
      where: {
        id: idInventory,
      },
    });

    const [_, objectInventory] = await prisma.$transaction([
      inventoryUpdated,
      inventory,
    ]);

    return success({
      res,
      data: objectInventory,
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
    const idInventory = Number(req.params.idInventory);

    await prisma.product_inventory.delete({
      where: {
        id: idInventory,
      },
    });
    return success({ res, data: "Inventory delete" });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};
