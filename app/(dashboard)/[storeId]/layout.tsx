import { Navbar } from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    const awaitedParams = await params;
    const storeId = awaitedParams.storeId;

    const user = await currentUser();

    if (!user) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId: user.id
        }
    });

    if (!store) {
        redirect('/')
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}