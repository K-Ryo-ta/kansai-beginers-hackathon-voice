"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    title: string
    fit: number
    creativity: number
    comprehensibility: number
    moved: number
    editing: number
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "fit",
        header: "Fit",
    },
    {
        accessorKey: "creativity",
        header: "Creativity",
    },
    {
        accessorKey: "comprehensibility",
        header: "Comprehensibility",
    },
    {
        accessorKey: "moved",
        header: "Moved",
    },
    {
        accessorKey: "editing",
        header: "Editing",
    },
]
