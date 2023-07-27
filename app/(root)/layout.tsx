import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
    children,

}: {
    children: React.ReactNode;
}) {
    /* `const { userId } = auth();` is destructuring the `userId` property from the return value of the
    `auth()` function. The `auth()` function is likely a function provided by the `@clerk/nextjs`
    library that returns information about the currently authenticated user. By destructuring
    `userId`, the code is extracting the value of the `userId` property and assigning it to a
    variable named `userId`. */
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    /* The code is using the `prismadb` library to query the database for a store record. It is calling
    the `findFirst` method on the `store` object, passing in a `where` clause that specifies the
    `userId` property should match the value of the `userId` variable. */
    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    });

    /* The `if (store)` condition checks if the `store` variable is truthy, meaning it has a value. If
    the `store` variable has a value, it means that a store record was found in the database for the
    current user. */
    if (store) {
        redirect(`/${store.id}`);
    }

    return(
        <>
            {children}
        </>
    );
};