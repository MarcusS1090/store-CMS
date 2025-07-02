import { auth } from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/main-nav"
import StoreSwitcher from "@/components/store-switcher"
import { ThemeToggle } from "./theme-toggle";

/**
 * The `Navbar` function is a TypeScript React component that renders a navigation bar, checks if the
 * user is authenticated, queries the database for stores belonging to the user, and displays the store
 * switcher, main navigation, and user button.
 * @returns The code is returning a JSX element representing a Navbar component.
 */
export const Navbar = async () => {
    /* The line `const { userId } = auth();` is using destructuring assignment to extract the `userId`
    property from the object returned by the `auth()` function. */
    const { userId } = await auth();

    /* The code `if (!userId) { redirect("/sign-in"); }` is checking if the `userId` variable is falsy
    (null, undefined, false, 0, etc.). If it is falsy, it means that the user is not authenticated
    or logged in. In that case, the code redirects the user to the "/sign-in" page. This is a common
    pattern used to ensure that only authenticated users can access certain parts of the
    application. */
    if (!userId) {
        redirect("/sign-in");
    }

    /* The code `const store = await prismadb.store.findMany({ where: { userId, }, });` is querying the
    database using the `prismadb` library to find all the stores that belong to a specific user. It
    is using the `findMany` method to retrieve multiple store records that match the specified
    `userId`. The result is stored in the `store` variable. */
    const store = await prismadb.store.findMany({
        where: {
            userId,
        },
    });
    /* The `return` statement is returning a JSX element representing the structure and content of the
    Navbar component. */
    return (
        <div
            className="border-b"
        >
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={store} />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )
}

