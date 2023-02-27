import type { Request, Response } from "express";
import prisma from "../../datasource";
import { failure, success } from "../../response";

export const store = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data = req.body;
        const payment = await prisma.customer_payment.create({ data });
        return success({
            res,
            status: 201,
            data: { payment }
        })

    } catch (error: any) {
        return failure({
            res,
            message: error,
        });
    }
};

export const findAll = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const payment = await prisma.customer_payment.findMany({});

        return success({
            res,
            data: payment
        })
    } catch (error: any) {
        return failure({
            res,
            message: error,
        })
    }
}

export const getOne = async (req: Request, res: Response): Promise<Response> => {
    try {
        const idPayment = Number(req.params.idPayment);
        const payment = await prisma.customer_payment.findUnique({
            where: {
                id: idPayment,
            },
        });
        return success({
            res,
            data: payment
        })
    } catch (error: any) {
        return failure({
            res,
            message: error,
        })
    };
};

export const update = async (req: Request, res: Response): Promise<Response> => {
    try {
        const idPayment = Number(req.params.idPayment);

        const paymentUpdated = prisma.customer_payment.update({
            where: { id: idPayment },
            data: req.body,
        });

        const payment = prisma.customer_payment.findUnique({
            where: {
                id: idPayment,
            },
        });

        const [_, objectPayment] = await prisma.$transaction([paymentUpdated, payment])

        return success({
            res,
            data: objectPayment,
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
        const idPayment = Number(req.params.idPayment);

        await prisma.customer_payment.delete({
            where: { id: idPayment },
        });
        return success({
            res,
            data: "Customer payment delete",
        });
    } catch (error: any) {
        return failure({
            res,
            message: error,
        });
    }
};