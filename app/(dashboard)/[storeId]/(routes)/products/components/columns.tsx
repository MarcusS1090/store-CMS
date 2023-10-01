"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { CellAction } from "./cell-action"



export type ProductColumn = {
    id: string;
    name: string;
    price: string;
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
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },

    {
        accessorKey: "supplier",
        header: "Supplier",
    },

    {
        accessorKey: "isArchived",
        header: "Archived",
    },

    {
        accessorKey: "isFeatured",
        header: "Featured",
    },

    {
        accessorKey: "price",
        header: "Price",
    },

    {
        accessorKey: "category",
        header: "Category",
    },

    {
        accessorKey: "size",
        header: "Size",
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
        header: "Date",
    },

    {
        id: "actions",
        cell: ({ row }) => < CellAction data={row.original} />
    }
]
