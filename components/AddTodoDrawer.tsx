'use client'
import * as React from "react"
 
import { cn } from "@/lib/utils"
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button"
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

  import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useDispatch, useSelector } from 'react-redux'
import { closeDrawer } from '@/store/reducers/drawer.slice'
  

const AddTodoDrawer = () => {
  
    const dispatch = useDispatch();

    const isDrawerOpen = useSelector((state:any) => state.drawer.isDrawerOpen);
  
    const closeDrawerHandler = () => {
      dispatch(closeDrawer());
    }
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
      return (
        <Dialog open={isDrawerOpen}>
          {/* <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger> */}
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            {/* <ProfileForm /> */}

            <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button variant="outline" onClick={closeDrawerHandler}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
          </DialogContent>
        </Dialog>
      )
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