import React from 'react'
import { Payment, columns } from "../payments/columns"
import { DataTable } from "../payments/data-tables"
import { Button } from "@/components/ui/button"


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            title: "Payment 1",
            fit: 1,
            creativity: 1,
            comprehensibility: 1,
            moved: 1,
            editing: 1,
        },
        {
            id: "738ed52f",
            title: "Payment 2",
            fit: 1,
            creativity: 1,
            comprehensibility: 1,
            moved: 1,
            editing: 1,
        },
        {
            id: "748ed52f",
            title: "Payment 3",
            fit: 1,
            creativity: 1,
            comprehensibility: 1,
            moved: 1,
            editing: 1,
        },
        {
            id: "758ed52f",
            title: "Payment 4",
            fit: 1,
            creativity: 1,
            comprehensibility: 1,
            moved: 1,
            editing: 1,
        },
    ]
}

async function page() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <Button>Login</Button>
            <DataTable<Payment, unknown> columns={columns} data={data} />
        </div>
    )
}

export default page
