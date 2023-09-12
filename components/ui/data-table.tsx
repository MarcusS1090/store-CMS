"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



import * as React from "react"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getFilteredRowModel,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

/* The `DataTableProps` interface is defining the props that can be passed to the `DataTable`
component. It has three properties: */
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
}: DataTableProps<TData, TValue>) {

    /* The line `const [sorting, setSorting] = React.useState<SortingState>([])` is using the
    `useState` hook from React to create a state variable called `sorting` and a corresponding
    setter function called `setSorting`. The initial value of the `sorting` state is an empty array
    `[]`, and the type of the state is specified as `SortingState`. */
    const [sorting, setSorting] = React.useState<SortingState>([])

    /* The line `const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])` is
    using the `useState` hook from React to create a state variable called `columnFilters` and a
    corresponding setter function called `setColumnFilters`. The initial value of the
    `columnFilters` state is an empty array `[]`, and the type of the state is specified as
    `ColumnFiltersState`. This state is used to store the column filters applied to the DataTable
    component. */
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    /* The `useReactTable` hook is used to create a table instance with the specified data and columns.
    It takes an object as an argument with various properties: */
    const table = useReactTable({
        data,
        columns,
        
        /* The `getCoreRowModel` and `getPaginationRowModel` are functions that are used to generate
        different row models for the DataTable component. */
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        
        /* The `onSortingChange` property is used to set the state of the sorting in the DataTable
        component. It takes a callback function `setSorting` that will be called whenever the
        sorting changes. The `getSortedRowModel` function is used to generate the sorted row model
        based on the current sorting state. */
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        /* The `onColumnFiltersChange` property is used to set the state of the column filters in the
        DataTable component. It takes a callback function `setColumnFilters` that will be called
        whenever the column filters change. */
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters
        }
    })

    return (
        <div>
            <div className="flex items-center py-4">
                <Input 
                    placeholder="Search"
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("label")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage}
                disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
