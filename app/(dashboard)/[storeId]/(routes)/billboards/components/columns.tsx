"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { CellAction } from "./cell-action"


/**
 * The above type represents a column in a billboard with properties such as id, label, and createdAt.
 * @property {string} id - A unique identifier for the billboard column.
 * @property {string} label - The "label" property is a string that represents the label or name of the
 * billboard column.
 * @property {string} createdAt - The `createdAt` property is a string that represents the date and
 * time when the `BillboardColumn` was created.
 */
export type BillboardColumn = {
    id: string
    label: string
    createdAt: string
}

/* The code `export const columns: ColumnDef<BillboardColumn>[] = [...]` is defining an array of column
definitions for a billboard. Each element in the array represents a column and has properties such
as `accessorKey`, `header`, and `cell`. */
export const columns: ColumnDef<BillboardColumn>[] = [
    /* The code block you provided is defining a column for a billboard. This specific column has an
    accessor key of "label" and a header that is a function. */
    {
        accessorKey: "label",
        header: ({column}) => {
            return (
                <Button
                    variant= "ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Etiqueta
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    /* The code block `{
            accessorKey: "createdAt",
            header: "Date",
        }` is defining a column for a billboard. */
    {
        accessorKey: "createdAt",
        header: "Fecha",
    },
    /* The code block `{
            id: "actions",
            cell: ({ row }) => <CellAction data={row.original} />
        }` is defining a column for a billboard that represents actions that can be performed on
    each row of data. */
    {
        id: "actions",
        cell: ({ row }) => < CellAction data={row.original} />
    }
]
