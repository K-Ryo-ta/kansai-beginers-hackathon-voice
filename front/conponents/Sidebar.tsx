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
  userId: string
  id: string
};


const Sidebar = (props: SidebarProps) => {

  const ScreenPath = "/profile"

  // スライダー値の配列を初期化（ここでは、"A", "B", "C"の3つの要素を持つと想定）
  const [sliderValues, setSliderValues] = useState<number[]>([50, 50, 50, 50, 50]);

  console.log("props", props);
  const handleEvaluateSend = async () => {
    const payload = {
      fit: sliderValues[0],
      creativity: sliderValues[1],
      comprehensibility: sliderValues[2],
      moved: sliderValues[3],
      editing: sliderValues[4],
      videoId: props.id,
      userId: props.userId
    };
    console.log(payload);
    try {
      const response = await fetch('http://127.0.0.1:8000/evaluate/send/', {
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

  localStorage.setItem('videoID', props.id);

  return (
    <div className='inline-flex flex-col border h-[1vh]'>


      <Link href={ScreenPath} passHref className="background-color: rgb(100 116 139)">
        <img src="/images/myReport.svg" className='h-[1vh]' />
      </Link>
      {/* ドロワーのとこ */}
      <Drawer>
        <DrawerTrigger><img src='/images/addMovie.svg'></img>
        </DrawerTrigger>
        <DrawerContent className='h-[10vh]'>
          <DrawerHeader className='h-[10%]'>
            <DrawerTitle><Movie /></DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
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
        <SheetTrigger> <img src="/images/Scoring.svg" className='h-[10vh]' /></SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>evaluation</SheetTitle>
          </SheetHeader>



          <ParentArray sliderValues={sliderValues} setSliderValues={setSliderValues} />
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
                <AlertDialogAction onClick={handleEvaluateSend}>Send</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SheetContent>
      </Sheet>

    </div>
  )
}

export default Sidebar
