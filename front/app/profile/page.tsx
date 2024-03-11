'use client'
import React, { useEffect, useState } from 'react'
import { Payment, columns } from "../payments/columns"
import { DataTable } from "../payments/data-tables"
import { Button } from "@/components/ui/button"
// async function getData(): Promise<Payment[]> {
//     // Fetch data from your API here.
//     return [
//         {
//             id: "728ed52f",
//             title: "Payment 1",
//             fit: 1,
//             creativity: 1,
//             comprehensibility: 1,
//             moved: 1,
//             editing: 1,
//         },
//         {
//             id: "738ed52f",
//             title: "Payment 2",
//             fit: 1,
//             creativity: 1,
//             comprehensibility: 1,
//             moved: 1,
//             editing: 1,
//         },
//         {
//             id: "748ed52f",
//             title: "Payment 3",
//             fit: 1,
//             creativity: 1,
//             comprehensibility: 1,
//             moved: 1,
//             editing: 1,
//         },
//         {
//             id: "758ed52f",
//             title: "Payment 4",
//             fit: 1,
//             creativity: 1,
//             comprehensibility: 1,
//             moved: 1,
//             editing: 1,
//         },
//     ]
// }

function page() {
    const [evaluatedData, setEvaluatedData] = useState<Payment[]>([]); // 動画リストの状態


    async function getvideoIDData() {
        const res = await fetch(`http://127.0.0.1:8000/evaluate/caluculate/${localStorage.getItem('videoID')}`, {
            method: 'GET',
        })

        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return res.json()
    }

    async function getvideotitleData() {
        const res = await fetch(`http://127.0.0.1:8000/video/description/${localStorage.getItem('videoID')}`, {
            method: 'GET',
        })

        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return res.json()
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getvideoIDData();
                const videotitledata = await getvideotitleData();
                setEvaluatedData(
                    [
                        {
                            id: localStorage.getItem('videoID') || '',
                            title: videotitledata.title,
                            fit: fetchedData[0],
                            creativity: fetchedData[1],
                            comprehensibility: fetchedData[2],
                            moved: fetchedData[3],
                            editing: fetchedData[4],
                        }
                    ]
                );
                console.log(fetchedData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    return (
        <div className="container mx-auto py-10">
            <DataTable<Payment, unknown> columns={columns} data={evaluatedData} />
        </div>
    )
}

export default page
