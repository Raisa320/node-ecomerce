import type { Request, Response } from "express";
import prisma from "../../datasource";
import { failure, success } from "../../response";

export const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = req.body;
    const product = await prisma.product.create({ data });
    return success({
      res,
      status: 201,
      data: product,
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
    const products = await prisma.product.findMany({});

    return success({
      res,
      data: products,
    });
  } catch (error) {
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
    const idProduct = Number(req.params.idProduct);
    const product = await prisma.product.findUnique({
      where: {
        id: idProduct,
      },
    });
    return success({
      res,
      data: product,
    });
  } catch (error) {
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
    const idProduct = Number(req.params.idProduct);
    const productUpdated = prisma.product.update({
      where: { id: idProduct },
      data: req.body,
    });

    const product = prisma.product.findUnique({
      where: { id: idProduct },
    });

    const [_, objectProduct] = await prisma.$transaction([
      productUpdated,
      product,
    ]);

    return success({
      res,
      data: objectProduct,
    });
  } catch (error) {
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
    const idProduct = Number(req.params.idProduct);

    await prisma.product.delete({
      where: { id: idProduct },
    });
    return success({
      res,
      data: "Product delete",
    });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};
