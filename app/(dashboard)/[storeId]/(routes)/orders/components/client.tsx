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
                    title={`Orders(${data.length})`}
                    description="Manage your Orders for your store"
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