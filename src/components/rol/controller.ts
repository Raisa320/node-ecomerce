import type { Request, Response } from "express";
import prisma from "../../datasource";
import { failure, success } from "../../response";

export const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = req.body;
    const rol = await prisma.rol.create({ data: data });
    return success({
      res,
      status: 201,
      data: rol,
    });
  } catch (error: any) {
    return failure({
      res,
      message: error,
    });
  }
};

export const findAll = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const roles = await prisma.rol.findMany({});

    return success({
      res,
      data: roles,
    });
  } catch (error: any) {
    return failure({
      res,
      message: error,
    });
  }
};

export const getOne = async (req: Request,res: Response): Promise<Response> => {
  try {
    const idRol = Number(req.params.idRol);
    const rol = await prisma.rol.findUnique({
      where: {
        id: idRol,
      },
    });
    return success({
      res,
      data: rol,
    });
  } catch (error: any) {
    return failure({
      res,
      message: error,
    });
  }
};

export const update = async (req: Request,res: Response): Promise<Response> => {
  try {
    const idRol = Number(req.params.idRol);

    const rolUpdated = prisma.rol.update({
      where: { id: idRol },
      data: req.body,
    });

    const rol = prisma.rol.findUnique({
      where: {
        id: idRol,
      },
    });

    const [_, objectRol]=await prisma.$transaction([rolUpdated, rol])

    return success({
      res,
      data: objectRol,
    });

  } catch (error: any) {
    return failure({
      res,
      message: error,
    });
  }
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
  try {
    const idRol = Number(req.params.idRol);

    await prisma.rol.delete({
      where: { id: idRol },
    });
    return success({
      res,
      data: "Rol delete",
    });
  } catch (error: any) {
    return failure({
      res,
      message: error,
    });
  }
};
