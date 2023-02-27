// import type { Request, Response } from "express";
// import express  from "express"; 
// import { success } from "../response";
import bcrypt from "bcrypt";


export const encriptPass = async (data:any) => {

    let hashedPassword =await bcrypt.hash(data.password, 8);
    return hashedPassword;
}