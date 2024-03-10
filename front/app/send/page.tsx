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



const page = () => {
    const [theme, setTheme] = useState<string | null>(null);

    async function onSubmit() {
        if (!theme) {
            return
        }
        const formData = new FormData()
        formData.append("input", theme)
        const response = await fetch('http://127.0.0.1:8000/theme', {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        console.log(data)
    }

    const handleThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("event.target.value", event.target.value)
        setTheme(event.target.value);
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

export default page
