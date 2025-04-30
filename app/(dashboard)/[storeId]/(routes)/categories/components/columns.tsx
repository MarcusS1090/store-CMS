"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { CellAction } from "./cell-action"




export type CategoryColumn = {
    id: string
    name: string
    billboardLabel: string
    createdAt: string
}


export const columns: ColumnDef<CategoryColumn>[] = [
    
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
        accessorKey: "billboard",
        header: "Cartelera",
        cell: ({ row }) =>  row.original.billboardLabel,
    },
    {
        accessorKey: "createdAt",
        header: "Fecha"
    },
    
    {
        id: "actions",
        cell: ({ row }) => < CellAction data={row.original} />
    }
]
