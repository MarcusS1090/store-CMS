"use client";

//global import
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";


import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import { ColorColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface ColorsClientProps {

    data: ColorColumn[]
}

export const ColorsClient: React.FC<ColorsClientProps> = ({ data }) => {

    const router = useRouter();

    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Colores (${data.length})`}
                    description="Administra los colores de tu tienda"
                />
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <PlusIcon className="mr-2 h-4 w-4"/>
                    Añadir nuevo color
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
                description="Llamadas a la API para colores"
            />
            <Separator />
            <ApiList entityName="colors" entityIdName="colorId"/>
        </>
    )
}