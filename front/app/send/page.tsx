import React from 'react'

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const page = () => {
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
                                <Input id="theme" placeholder="Theme" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Send</Button>
                </CardFooter>
            </Card>
        </div>


    )
}

export default page
