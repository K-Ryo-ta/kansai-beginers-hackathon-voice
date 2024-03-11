'use client'
import React, { ChangeEvent, useState, MouseEvent, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
    id: string
    email: string
    password: string
    name: string
    videos: string | null
    evaluations: string | null
    createdAt: Date
    updatedAt: Date
}

interface Users {
    user: User[]
}



const Page = () => {

    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [loginuser, setLoginUser] = useState<Users | null>(null);
    const [userID, setUserID] = useState<string | null>(null);

    const router = useRouter();

    async function onSubmit() {
        if (!email || !password) {
            console.log('Missing fields');
            return;
        }
        const payload = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/login', {
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

    async function onLoginSubmit() {
        if (!email || !password) {
            console.log('Missing fields');
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/user', {
                method: 'GET',
            });
            const res: User[] = await response.json();
            console.log(res);
            res.map((user: User) => {
                if (user.email == email) {
                    console.log('ログイン成功');
                    setUserID(user.id);
                    localStorage.setItem('userID', user.id);
                    console.log('userID', userID);
                    return;
                }
            })
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


    const handleJudgement = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        if (!email) {
            console.log('emailが選択されていません。');
            return;
        }
        if (!password) {
            console.log('passwordが選択されていません。');
            return;
        }
        onSubmit()
        // 実際のアプリケーションではここでファイルをサーバーにアップロードします。
        alert('ログインされました！（デモ用）');
        onLoginSubmit();
        event.preventDefault();
        router.push('/')

    };


    return (
        <div className="mt-2 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">

                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Welcome to Our App</CardTitle>
                        <CardDescription className="text-center">Log in to access all features</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="Enter your email" onChange={handleEmailChange} />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" placeholder="Enter your password" onChange={handlePasswordChange} />
                            </div>
                            <Button className="w-full" onClick={handleJudgement}>
                                Log In
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="text-center">
                        <p className="text-gray-600">Don't have an account?</p>
                        <a href="/signup" className="text-blue-500 hover:text-blue-600 font-semibold">Sign Up</a>
                    </CardFooter>
                </Card>

            </div >
        </div >
    );
};

export default Page;
