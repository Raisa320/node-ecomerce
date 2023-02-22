import type { Request, Response } from "express";
import prisma from "../../datasource";
import { failure, success } from "../../response";

export const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = req.body;
    const discount = await prisma.discount.create({ data });
    return success({
      res,
      status: 201,
      data: discount,
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
    const discounts = await prisma.discount.findMany({});
    return success({
      res,
      data: discounts,
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
    const idDiscount = Number(req.params.idDiscount);
    const discount = await prisma.discount.findUnique({
      where: { id: idDiscount },
    });
    return success({ res, data: discount });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idDiscount = Number(req.params.idDiscount);

    const discountUpdated = prisma.discount.update({
      where: { id: idDiscount },
      data: req.body,
    });

    const discount = prisma.discount.findUnique({
      where: {
        id: idDiscount,
      },
    });

    const [_, objectDiscount] = await prisma.$transaction([
      discountUpdated,
      discount,
    ]);

    return success({
      res,
      data: objectDiscount,
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
    const idDiscount = Number(req.params.idDiscount);

    await prisma.discount.delete({
      where: {
        id: idDiscount,
      },
    });
    return success({ res, data: "Discount delete" });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};
