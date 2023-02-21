import type { Request, Response } from "express";
import prisma from "../../datasource";
import { failure, success } from "../../response";

export const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = req.body;
    const category = await prisma.product_category.create({ data: data });
    return success({
      res,
      status: 201,
      data: category,
    });
  } catch (error: any) {
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
    const categories = await prisma.product_category.findMany({});

    return success({
      res,
      data: categories,
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
    const idCategory = Number(req.params.idCategory);
    const category = await prisma.product_category.findUnique({
      where: {
        id: idCategory,
      },
    });
    return success({
      res,
      data: category,
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
    const idCategory = Number(req.params.idCategory);

    const categoryUpdated = prisma.product_category.update({
      where: { id: idCategory },
      data: req.body,
    });

    const category = prisma.product_category.findUnique({
      where: {
        id: idCategory,
      },
    });

    const [_, objectCategory] = await prisma.$transaction([
      categoryUpdated,
      category,
    ]);

    return success({
      res,
      data: objectCategory,
    });
    //return res.status(200).json({ ok: true, data: categoryUpdated });
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
    const idCategory = Number(req.params.idCategory);

    await prisma.product_category.delete({
      where: { id: idCategory },
    });
    return success({
      res,
      data: "Category delete",
    });
  } catch (error: any) {
    return failure({
      res,
      message: error,
    });
  }
};
