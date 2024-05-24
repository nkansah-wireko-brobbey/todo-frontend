'use client'
import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from 'react-redux'
import { closeDrawer } from '@/store/reducers/drawer.reducer'
  

const AddTodoDrawer = () => {
  
    const dispatch = useDispatch();

    const isDrawerOpen = useSelector((state:any) => state.drawer.isDrawerOpen);
  
    const closeDrawerHandler = () => {
      dispatch(closeDrawer());
    }
  return (
    <div>
        <Drawer
        open={isDrawerOpen}
        >
  {/* <DrawerTrigger>Open</DrawerTrigger> */}
  <DrawerContent className='flex flex-col items-center'>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline" onClick={closeDrawerHandler}>Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

    </div>
  )
}

export default AddTodoDrawer