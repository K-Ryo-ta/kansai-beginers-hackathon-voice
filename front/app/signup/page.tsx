'use client'
import React, { ChangeEvent, useState, MouseEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const router = useRouter();

    async function onSubmit() {
        if (!email || !password || !name) {
            console.log('Missing fields');
            return;
        }

        const payload = {
            email: email,
            password: password,
            name: name, // startDateがDateオブジェクトであることを前提としています
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/resister', {
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

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("event.target.value", event.target.value)
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("event.target.value", event.target.value)
        setPassword(event.target.value);
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("event.target.value", event.target.value)
        setName(event.target.value);
    };

    const handleUpload = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        if (!email) {
            console.log('emailが選択されていません。');
            return;
        }
        if (!password) {
            console.log('passwordが選択されていません。');
            return;
        }
        if (!name) {
            console.log('nameが選択されていません。');
            return;
        }
        onSubmit()
        // 実際のアプリケーションではここでファイルをサーバーにアップロードします。
        alert('登録されました！（デモ用）');

        event.preventDefault();
        router.push('/login')
    };

    return (
        <div className="mt-2 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Welcome to Our App</CardTitle>
                        <CardDescription className="text-center">Sign up to access all features</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6">
                            <div>
                                <Label htmlFor="name">name</Label>
                                <Input type="name" id="name" placeholder="Enter your name" onChange={handleNameChange} />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="Enter your email" onChange={handleEmailChange} />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" placeholder="Enter your password" onChange={handlePasswordChange} />
                            </div>
                            <Button className="w-full" onClick={handleUpload}>
                                Sign up
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Page;
