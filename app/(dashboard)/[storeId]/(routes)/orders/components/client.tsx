"use client";

//global import
import { useParams, useRouter } from "next/navigation";


import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";

import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {

    data: OrderColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {

    return (
        <>
                <Heading 
                    title={`Pedidos(${data.length})`}
                    description="Administrar los pedidos de la tienda"
                />
            <Separator />
            <DataTable
                columns={columns}
                data={data}
                searchKey="products"
            />
        </>
    )
}