'use client'
import React, { ChangeEvent, useState, MouseEvent } from 'react'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"





const Page = () => {
    const [theme, setTheme] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setendDate] = useState<Date | null>(null);

    async function onSubmit() {
        if (!theme || !description || !startDate || !endDate) {
            console.log('Missing fields');
            return;
        }

        const payload = {
            title: theme,
            description: description,
            startDate: startDate.toISOString(), // startDateがDateオブジェクトであることを前提としています
            endDate: endDate.toISOString(), // endDateがDateオブジェクトであることを前提としています
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/theme/send', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const res = await response.json();
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }

    const handleThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("event.target.value", event.target.value)
        setTheme(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("event.target.value", event.target.value)
        setDescription(event.target.value);
    };

    const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.value ? new Date(event.target.value) : null;
        setStartDate(newDate);
    };

    const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.value ? new Date(event.target.value) : null;
        setendDate(newDate); // 関数名がsetendDateからsetEndDateに修正されるべきです。
    };
    const handleUpload = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        if (!theme) {
            console.log('themeが選択されていません。');
            return;
        }
        onSubmit()
        // 実際のアプリケーションではここでファイルをサーバーにアップロードします。
        alert('themeがアップロードされました！（デモ用）');
    };

    return (
        <div className='flex justify-center items-center mt-auto h-[80vh]'>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Thought Next Theme</CardTitle>
                    <CardDescription>Send your thinking theme in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="Theme">Theme</Label>
                                <Input id="theme" placeholder="Theme" onChange={handleThemeChange} />
                                <Input id="description" placeholder="Description" onChange={handleDescriptionChange} />
                                <Input id="startDate" type="date" placeholder="Start Date" onChange={handleStartDateChange} />
                                <Input id="endDate" type="date" placeholder="End Date" onChange={handleEndDateChange} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleUpload}>Send</Button>
                </CardFooter>
            </Card>
        </div>


    )
}

export default Page
