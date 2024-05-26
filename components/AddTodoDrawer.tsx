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
import { useAppDispatch } from '@/lib/hooks/reduxStore.hooks'
import { useAppSelector } from "@/lib/hooks/reduxStore.hooks";

import { AddTodoForm, TODO_FORM } from './AddTodoForm'
import { CATEGORY_FORM, AddTodoFormCategory } from "./AddTodoFormCategory";
import AddTodoFormPanel, { PANEL_FORM } from "./AddTodoFormPanel";



type Props = {
    title?: string;
    description?: string;
    FormComponent?: any;
}

const AddTodoDrawer = ({title, description, FormComponent}:Props) => {
  
    const dispatch = useAppDispatch();

    const isDrawerOpen = useSelector((state:any) => state.drawer.isDrawerOpen);

    let {componentName, componentTitle, componentDescription, panel_id} = useAppSelector((state:any) => state.drawer);


  
    const closeDrawerHandler = () => {
      dispatch(closeDrawer());
    }
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
      return (
        <Dialog open={isDrawerOpen}>
          {}
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{componentTitle || "Edit profile"}</DialogTitle>
              <DialogDescription>
               {componentDescription ||" Make changes to your profile here. Click save when you're done."}
              </DialogDescription>
            </DialogHeader>
            { (componentName === TODO_FORM) && <AddTodoForm panel_id={panel_id}/>}
            {(componentName === CATEGORY_FORM) && <AddTodoFormCategory />}
            {(componentName === PANEL_FORM) && <AddTodoFormPanel />}

            <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button variant="outline" onClick={closeDrawerHandler}>Close</Button>
          </DialogClose>
        </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    }

  return (
        <Drawer
        open={isDrawerOpen}
        >
  {/* <DrawerTrigger>Open</DrawerTrigger> */}
  <DrawerContent className='flex flex-col items-center'>
    <DrawerHeader>
      <DrawerTitle>{componentTitle}</DrawerTitle>
      <DrawerDescription>{componentDescription}</DrawerDescription>
    </DrawerHeader>
    {(componentName === TODO_FORM) && <AddTodoForm panel_id={panel_id} />}
    {(componentName === CATEGORY_FORM) && <AddTodoFormCategory />}
    {(componentName === PANEL_FORM) && <AddTodoFormPanel />}
    <DrawerFooter>
      <DrawerClose>
        <Button variant="outline" onClick={closeDrawerHandler}>Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

  )
}

export default AddTodoDrawer