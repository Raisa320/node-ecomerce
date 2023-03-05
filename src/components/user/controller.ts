import type { Request, Response } from "express";
import prisma from "../../datasource";
import { failure, success } from "../../response";
import { encriptPass } from "../../utils/bcrypt";

export const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = req.body;
    const hashedPassword = await encriptPass(data.password);
    const user = await prisma.user.create({
      data: {
        username: data.username,
        password: String(hashedPassword),
        first_name: data.first_name,
        last_name: data.last_name,
        telephone: data.telephone,
        rol_id: data.rol_id,
      },
      include: { rol: true },
    });

    return success({
      res,
      status: 201,
      data: user,
    });
  } catch (error: any) {
    console.log(error);
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
    const users = await prisma.user.findMany({});

    return success({
      res,
      data: users,
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
    const idUser = Number(req.params.idUser);
    const user = await prisma.user.findUnique({
      where: {
        id: idUser,
      },
    });
    return success({
      res,
      data: user,
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
    const idUser = Number(req.params.idUser);

    const userUpdated = prisma.user.update({
      where: { id: idUser },
      data: req.body,
    });

    const user = prisma.user.findUnique({
      where: {
        id: idUser,
      },
    });

    const [_, objectUser] = await prisma.$transaction([userUpdated, user]);

    return success({
      res,
      data: objectUser,
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
    const idUser = Number(req.params.idUser);

    await prisma.user.delete({
      where: { id: idUser },
    });
    return success({
      res,
      data: "User delete",
    });
  } catch (error: any) {
    return failure({
      res,
      message: error,
    });
  }
};
