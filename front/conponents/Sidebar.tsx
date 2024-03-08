import React, { useState } from 'react';
import Link from 'next/link';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from "@/components/ui/button";
import Movie from './Movie';


const Sidebar = () => {

const ScreenPath = "/profile"

  return (
    <div className='border h-[70vh] w-[10vh] mt-auto mb-auto'>
      
    
    <Link href={ScreenPath} passHref className="background-color: rgb(100 116 139)">
        <img src="/images/profile.svg" className='h-[7vh]'/>
    </Link>
    
      <Drawer>
      <DrawerTrigger><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="black"/></svg>
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