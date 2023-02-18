import {Response} from 'express'

interface IResponse{
    res:Response;
    status?:number;
    data?: any;
    message?: any;
}

export function success({res, status=200,data}:IResponse):Response{
    if(data){
        return res.status(status).json({
            ok: true,
            data,
        })
    }else{
        return failure({res,message:"Not Found Data"})
    }
}

export function failure({res, status=500,message}:IResponse):Response{
    message = message.meta?.cause ?? message;
    return res.status(status).json({
        ok: false,
        message,
    })
}
