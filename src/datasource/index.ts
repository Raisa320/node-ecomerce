import { PrismaClient } from ".prisma/client";
import { middelware } from "../middlewares/PrismaMiddleware";

const prisma = new PrismaClient();
middelware(prisma)
export default prisma;
