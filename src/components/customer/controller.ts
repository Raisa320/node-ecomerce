import type { Request, Response } from "express";
import prisma from "../../datasource";
import { failure, success } from "../../response";

export const store = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data = req.body;
        const customer = await prisma.customer.create({ data });
        return success({
            res,
            status: 201,
            data: { customer }
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
        const customers = await prisma.customer.findMany({});

        return success({
            res,
            data: customers
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
        const idCustomer = Number(req.params.idCustomer);
        const customer = await prisma.customer.findUnique({
            where: {
                id: idCustomer,
            },
        });
        return success({
            res,
            data: customer
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
        const idCustomer = Number(req.params.idCustomer);

        const customerUpdated = prisma.customer.update({
            where: { id: idCustomer },
            data: req.body,
        });

        const customer = prisma.customer.findUnique({
            where: {
                id: idCustomer,
            },
        });

        const [_, objectCustomer] = await prisma.$transaction([customerUpdated, customer])

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

export const remove = async (req: Request, res: Response): Promise<Response> => {
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

export const storeAddress = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data = req.body;
        const customerAddress = await prisma.customer_address.create({ data });
        return success({
            res,
            status: 201,
            data: customerAddress,
        })

    } catch (error: any) {
        return failure({
            res,
            message: error,
        });
    }
};

// export const findAllAddresses = async (_req: Request, res: Response): Promise<Response> => {
//     try {
//         const customerAddresses = await prisma.customer_address.findMany({});

//         return success({
//             res,
//             data: customerAddresses
//         })
//     } catch (error: any) {
//         return failure({
//             res,
//             message: error,
//         })
//     }
// }

// export const getOneAddress = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const idCustomerAddress = Number(req.params.idCustomerAddress);
//         const customerAddress = prisma.customer_address.findUnique({
//             where: {
//                 id: idCustomerAddress,
//             },
//         });
//         return success({
//             res,
//             data: customerAddress
//         })
//     } catch (error: any) {
//         return failure({
//             res,
//             message: error,
//         })
//     };
// };

// export const updateAddress = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const idCustomerAddress = Number(req.params.idCustomerAddress);

//         const customerAddressUpdated = prisma.customer_address.update({
//             where: { id: idCustomerAddress },
//             data: req.body,
//         });

//         const customerAddress = prisma.customer_address.findUnique({
//             where: {
//                 id: idCustomerAddress,
//             },
//         });

//         const [_, objectCustomerAddress] = await prisma.$transaction([customerAddressUpdated, customerAddress])

//         return success({
//             res,
//             data: objectCustomerAddress,
//         });

//     } catch (error: any) {
//         return failure({
//             res,
//             message: error,
//         });
//     }
// };

// export const removeAddress = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const idCustomerAddress = Number(req.params.idCustomerAddress);

//         await prisma.customer_address.delete({
//             where: { id: idCustomerAddress },
//         });
//         return success({
//             res,
//             data: "Customer Address delete",
//         });
//     } catch (error: any) {
//         return failure({
//             res,
//             message: error,
//         });
//     }
// };
