import React, { useState } from 'react';
import Link from 'next/link';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from "@/components/ui/button";
import Movie from './Movie';


const Sidebar = () => {

const ScreenPath = "/profile"

  return (
    <div className='inline-flex flex-col border h-[70vh] w-[10vh] mt-{20vh} w-7/10'>
      
    
    <Link href={ScreenPath} passHref className="background-color: rgb(100 116 139)">
        <img src="/images/myReport.svg" className='h-[7vh]'/>
    </Link>
    
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


    
 </div>
  )
}

export default Sidebar