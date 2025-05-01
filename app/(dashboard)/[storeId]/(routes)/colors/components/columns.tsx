"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { CellAction } from "./cell-action"



export type ColorColumn = {
    id: string;
    name: string;
    value: string;
    createdAt: string;
}

/* The code `export const columns: ColumnDef<BillboardColumn>[] = [...]` is defining an array of column
definitions for a billboard. Each element in the array represents a column and has properties such
as `accessorKey`, `header`, and `cell`. */
export const columns: ColumnDef<ColorColumn>[] = [
    /* The code block you provided is defining a column for a billboard. This specific column has an
    accessor key of "label" and a header that is a function. */
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
        accessorKey: "value",
        header: "Valor",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                {row.original.value}
                <div className=" h-6 w-6 rounded-full border" style={{backgroundColor: row.original.value}} 
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
