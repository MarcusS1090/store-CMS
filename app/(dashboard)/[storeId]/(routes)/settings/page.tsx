import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import { SettingsForm } from "./components/settings-Form";

interface SettingPageProps {
    params: {
        storeId: string;
    }
};

const SettingPage: React.FC<SettingPageProps>  = async ({ params }) => {
    /* `const { userId } = auth();` is destructuring the `userId` property from the `auth()` function.
    The `auth()` function is likely a function provided by a library (such as Clerk) that returns
    information about the currently authenticated user. By destructuring `userId` from the result of
    `auth()`, we can access the user's ID directly as a variable. */
    const { userId } = auth();

    /* The code `if (!userId) { redirect("/sign-in"); }` is checking if the `userId` variable is falsy
    (i.e., `null`, `undefined`, `false`, `0`, `NaN`, or an empty string). If `userId` is falsy, it
    means that the user is not authenticated. In that case, the code redirects the user to the
    "/sign-in" page. */
    if (!userId) {
        redirect("/sign-in");
    }

    /* The code `const store = await prismadb.store.findFirst({ where: { id: params.storeId, userId },
    });` is using the `prismadb` library to query the database for a store record. */
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        },
    });

    /* The code `if (!store) { redirect("/"); }` is checking if the `store` variable is falsy (i.e.,
    `null`, `undefined`, `false`, `0`, `NaN`, or an empty string). If `store` is falsy, it means
    that the query to the database did not find a matching store record. */
    if (!store) {
        redirect("/");
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm
                    initialData={store}
                />
            </div>
        </div>
    );
}

export default  SettingPage;