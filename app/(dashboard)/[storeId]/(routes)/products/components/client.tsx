"use client";

//global import
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";


import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface ProductClientProps {

    data: ProductColumn[]
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {

    const router = useRouter();

    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Productos(${data.length})`}
                    description="Administra los productos de tu tienda"
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <PlusIcon className="mr-2 h-4 w-4"/>
                    Añadir nuevo producto
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
                description="Llamadas a la API para productos"
            />
            <Separator />
            <ApiList entityName="products" entityIdName="productId"/>
        </>
    )
}