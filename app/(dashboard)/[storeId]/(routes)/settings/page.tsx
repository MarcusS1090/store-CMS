import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { SettingsForm } from "./components/settings-Form";

interface SettingPageProps {
    params: {
        storeId: string;
    }
};

const SettingPage = async (props: SettingPageProps) => {
    const awaitedParams = await props.params;
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: awaitedParams.storeId,
            userId
        },
    });

    if (!store) {
        redirect("/");
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store}/>
            </div>
        </div>
    );
}

export default SettingPage;