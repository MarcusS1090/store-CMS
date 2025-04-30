"use client";

//global import
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";


import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface BillboardClientProps {
    /* The `data: BillboardColumn[]` is defining a prop named `data` for the `BillboardClient`
    component. The prop `data` is expected to be an array of `BillboardColumn` objects. */
    data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
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
                    title={`Carteleras(${data.length})`}
                    description="Administra las carteleras de tu tienda"
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <PlusIcon className="mr-2 h-4 w-4"/>
                    Añadir nuevo
                </Button>
            </div>
            <Separator />
            <DataTable
                columns={columns}
                data={data}
                searchKey="label"
            />
            <Heading 
                title="API"
                description="API para la carteleras de tu tienda"
            />
            <Separator />
            <ApiList entityName="billboards" entityIdName="billboardId"/>
        </>
    )
}