import { PrismaClient } from "@prisma/client";

/* The `declare global` block is used to declare a global variable `prisma` with the type `PrismaClient
| undefined`. */
declare global {
    var prisma: PrismaClient | undefined
};

/* The line `const prismadb = globalThis.prisma || new PrismaClient();` is initializing a variable
`prismadb` with the value of `globalThis.prisma` if it exists, otherwise it creates a new instance
of `PrismaClient`. */
const prismadb = globalThis.prisma || new PrismaClient();

/* The `if (process.env.NODE_ENV !== "production")` block is checking if the current environment is not
set to "production". If it is not in production, it means that the code is running in a development
or testing environment. */
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prismadb;
}

export default prismadb;