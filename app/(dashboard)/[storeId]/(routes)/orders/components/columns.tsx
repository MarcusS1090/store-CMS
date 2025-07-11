"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


export type OrderColumn = {
    id: string;
    phone: string;
    address: string;
    isPaid: boolean;
    totalPrice: string;
    products: string;
    createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [

    {
        accessorKey: "products",
        header: ({column}) => {
            return (
                <Button
                    variant= "ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Productos
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },

    {
        accessorKey: "phone",
        header: "Telefono",
    },

    {
        accessorKey: "address",
        header: "Direccion",
    },

    {
        accessorKey: "totalPrice",
        header: "Precio Total",
    },

    {
        accessorKey: "isPaid",
        header: "Pagado",
    },

    {
        accessorKey: "createdAt",
        header: "Fecha",
    },

]
