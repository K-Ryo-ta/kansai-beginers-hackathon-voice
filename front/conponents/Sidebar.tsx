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
        <img src="/images/myReport.svg" className='h-[7vh]'/>
    </Link>
    {/* ドロワーのとこ */}
      <Drawer>
      <DrawerTrigger><img src='/images/addMovie.svg' className='h-[7vh]'></img>
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
      <Sheet>
     <SheetTrigger> <img src="/images/Scoring.svg" className='h-[7vh]'/></SheetTrigger>
      <SheetContent>
       <SheetHeader>
       <SheetTitle>あなたの思うような点数を</SheetTitle>
         <SheetDescription>
         Fit  
         </SheetDescription>
         
          
         < MyComponent/>
         
         <SheetDescription>
         Creativity
         </SheetDescription>
         < MyComponent/>
         <SheetDescription>
         Comprehensibility
         </SheetDescription>
         < MyComponent/>
         <SheetDescription>
         Moved Editing
         </SheetDescription>
         < MyComponent/>
         <SheetDescription>
         Editing
         </SheetDescription>
         < MyComponent/>
         </SheetHeader>
       </SheetContent>
    </Sheet>

    
 </div>
  )
}

export default Sidebar