import { Navbar } from "@/components/navbar";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params
} : {

    /* The `children` prop is used to render the content inside the `DashboardLayout` component. It is
    of type `React.ReactNode`, which means it can accept any valid React component or JSX element as
    its value. */
    children: React.ReactNode;
    params: {
        storeId: string
    }

}) {
    /* The line `const { userId } = auth();` is destructuring the `userId` property from the result of
    the `auth()` function. The `auth()` function is likely a function provided by a library or
    framework that handles authentication. It returns an object that contains information about the
    authenticated user, and the `userId` property is being extracted from that object and assigned
    to the `userId` variable. */
    const { userId } = auth();

    /* The code `if (!userId) { redirect('/sign-in'); }` is checking if the `userId` variable is falsy
    (i.e., not defined or empty). If the `userId` is falsy, it means that the user is not
    authenticated. In that case, the code is redirecting the user to the '/sign-in' page. This is
    likely a mechanism to ensure that only authenticated users can access the dashboard layout. */
    if (!userId) {
        redirect('/sign-in');
    }

    /* The code `const store = await prismadb.store.findFirst({ where: { id: params.storeId, userId }
    });` is using the `prismadb` library to query the database for a store record. */
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    /* The code `if (!store) { redirect('/') }` is checking if the `store` variable is falsy (i.e., not
    defined or empty). If the `store` is falsy, it means that the database query did not find a
    matching store record. In that case, the code is redirecting the user to the '/' page. This is
    likely a mechanism to handle the case where the requested store does not exist or is not
    accessible for the authenticated user. */
    if (!store) {
        redirect('/')
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    );
};