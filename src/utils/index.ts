// import { Router } from "express";
// import * as Controller from "./controller";

// const userRouter: Router = Router();

// userRouter.post("/", Controller.store);


// export default userRouter;






// import bcrypt from "bcrypt";
// import type { Request, Response } from "express";
// import express  from "express"; 
// import prisma from "../datasource";
// const index = express();

// index.use(express.urlencoded({extended:false}));
// index.use(express.json())
// index.post('/login',async (req:Request, res:Response)=>{
// const username = req.body.username;
// const password = req.body.password;
// const foundUsername = await prisma.user.findUnique({
//     where:{
//         username: username
//     }
// })
// const foundPassword = await prisma.user.findFirst({
//     where:{
//         password: password
//     }
// })
// if(username== foundUsername && password == password)
// {
//     let hashedPassword =await bcrypt.hash(password, 8);
//     res.json({
//         message:'VERDADERO',
//         hashedPassword : hashedPassword
//     })
// }else {
//     res.json({
//         message: 'FALSO'
//     })
// }

// })

// index.listen(8000,()=>{
//     console.log('open')
// })


// const enteredPassword = 'mypassword';
// if (bcrypt.compareSync(enteredPassword, hashedPassword)) {
//     console.log('La contraseña es correcta');
// } else {
//     console.log('La contraseña es incorrecta');
// }