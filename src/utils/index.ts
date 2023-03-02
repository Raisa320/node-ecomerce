
import bcrypt from "bcrypt";


export const encriptPass = (data:any) => {

    let hashedPassword = bcrypt.hash(data, 8);
    return hashedPassword;
}

