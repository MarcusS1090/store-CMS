"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { CellAction } from "./cell-action"



export type ProductColumn = {
    id: string;
    name: string;
    price: string;
    quantity: number;
    size: string;
    category: string;
    color: string;
    createdAt: string;
    isFeatured: boolean;
    isArchived: boolean;
}


export const columns: ColumnDef<ProductColumn>[] = [

    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <Button
                    variant= "ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },

    {
        accessorKey: "quantity",
        header: "Cantidad",
    },

    {
        accessorKey: "price",
        header: "Precio",
    },

    {
        accessorKey: "isArchived",
        header: "Archivado",
    },
    
    {
        accessorKey: "isFeatured",
        header: "Destacado",
    },
    {
        accessorKey: "supplier",
        header: "Proveedor",
    },

    {
        accessorKey: "category",
        header: "Categoría",
    },

    {
        accessorKey: "size",
        header: "Tamaño",
    },

    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                {row.original.color}
                <div
                    className="h-6 w-6 rounded-full border"
                    style={{backgroundColor: row.original.color}}
                />
            </div>
        )
    },

    {
        accessorKey: "createdAt",
        header: "Fecha",
    },

    {
        id: "actions",
        cell: ({ row }) => < CellAction data={row.original} />
    }
]
