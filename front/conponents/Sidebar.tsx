'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from "@/components/ui/button";
import Movie from './Movie';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from '@/components/ui/slider';
import { cn } from "@/lib/utils"
import MyComponent from '../components/ui/CustomSlider';
import ParentComponent from './ParentSlider';
import ParentArray from './ParentArray';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';


type SidebarProps = {
  // 他のプロパティを定義
  className?: string; // className をオプショナルプロパティとして追加
  // ...
};


const Sidebar = () => {

const ScreenPath = "/profile"

  return (
    <div className='inline-flex flex-col border h-[70vh] w-[10vh] mt-{20vh} w-7/10'>
      
    
    <Link href={ScreenPath} passHref className="background-color: rgb(100 116 139)">
        <img src="/images/myReport.svg" className='h-[10vh]'/>
    </Link>
    {/* ドロワーのとこ */}
      <Drawer>
      <DrawerTrigger><img src='/images/addMovie.svg' className='h-[10vh]'></img>
</DrawerTrigger>
        <DrawerContent>
         <DrawerHeader>
         <DrawerTitle><Movie /></DrawerTitle>
         <DrawerDescription>This action cannot be undone.</DrawerDescription>
         </DrawerHeader>
         <DrawerFooter>
         <Button>Submit</Button>

         <DrawerClose>
            <Button variant="outline">Cancel</Button>
         </DrawerClose>
        </DrawerFooter>
        </DrawerContent>
      </Drawer>
    {/* シートのやつ */}
      {/* <Sheet>
     <SheetTrigger> <img src="/images/Scoring.svg" className='h-[7vh]'/></SheetTrigger>
      <SheetContent>
       <SheetHeader>
       <SheetTitle>あなたの思うような点数を</SheetTitle>
         <SheetDescription>
         Fit  
         </SheetDescription>
         < MyComponent label="fit" onSliderChange={function (value: number): void {
              throw new Error('Function not implemented.');
            } }/>
         <SheetDescription>
         Creativity
         </SheetDescription>
         < MyComponent label="Creativity" onSliderChange={function (value: number): void {
              throw new Error('Function not implemented.');
            } }/>
         <SheetDescription>
         Comprehensibility
         </SheetDescription>
         < MyComponent label="Comprehensivility" onSliderChange={function (value: number): void {
              throw new Error('Function not implemented.');
            } }/>
         <SheetDescription>
         Moved 
         </SheetDescription>
         < MyComponent label="Moved" onSliderChange={function (value: number): void {
              throw new Error('Function not implemented.');
            } }/>
         <SheetDescription>
         Editing
         </SheetDescription>
         < MyComponent label="Editing" onSliderChange={function (value: number): void {
              throw new Error('Function not implemented.');
            } }/>
         </SheetHeader>
       </SheetContent>
    </Sheet> */}
           <Sheet>
     <SheetTrigger> <img src="/images/Scoring.svg" className='h-[10vh]'/></SheetTrigger>
      <SheetContent>
       <SheetHeader>
       <SheetTitle>evaluation</SheetTitle>
       </SheetHeader>
       <ParentArray />
       <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>注意※一つの動画につき採点を送れるのは1度だけです</AlertDialogTitle>
          <AlertDialogDescription>
            本当に採点情報を送りますか？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Send</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
       </SheetContent>
    </Sheet>
    
 </div>
  )
}

export default Sidebar