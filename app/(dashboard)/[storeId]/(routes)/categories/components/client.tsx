"use client";

//global import
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";


import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import { CategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface CategoriesClientProps {

    data: CategoryColumn[]
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {

    const router = useRouter();

    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Categorias(${data.length})`}
                    description="Administra las categorias de tus productos"
                />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <PlusIcon className="mr-2 h-4 w-4"/>
                    Añadir categoria
                </Button>
            </div>
            <Separator />
            <DataTable
                searchKey="name"
                columns={columns}
                data={data}
            />
            <Heading 
                title="API"
                description="LLama a esta API desde tu app para gestionar categorias"
            />
            <Separator />
            <ApiList entityName="categories" entityIdName="categoryId"/>
        </>
    )
}