"use client";

//global import
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";


import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import { SizeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface SizesClientProps {

    data: SizeColumn[]
}

export const SizesClient: React.FC<SizesClientProps> = ({ data }) => {

    const router = useRouter();

    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Sizes (${data.length})`}
                    description="Administra los tamaños de tus productos"
                />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <PlusIcon className="mr-2 h-4 w-4"/>
                    Añadir tamaño
                </Button>
            </div>
            <Separator />
            <DataTable
                columns={columns}
                data={data}
                searchKey="name"
            />
            <Heading 
                title="API"
                description="Llama a esta API desde tu app para gestionar tamaños"
            />
            <Separator />
            <ApiList entityName="sizes" entityIdName="sizeId"/>
        </>
    )
}