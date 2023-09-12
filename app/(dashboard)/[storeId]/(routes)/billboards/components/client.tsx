"use client";

import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";


export const BillboardClient = () => {
    /* The line `const router = useRouter();` is importing the `useRouter` hook from the
    `next/navigation` module and assigning it to the `router` constant. */
    const router = useRouter();
    /* The line `const params = useParams();` is using the `useParams` hook from the `next/navigation`
    module to get the parameters from the current route. It allows you to access the dynamic
    segments of the URL. The `params` constant will contain an object with key-value pairs
    representing the parameters in the URL. */
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title="Billboards(0)"
                    description="Manage your billboards for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <PlusIcon className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            <Separator />
        </>
    )
}