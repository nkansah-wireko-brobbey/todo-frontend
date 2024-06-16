"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "@/store/reducers/drawer.slice";
import { useAppDispatch } from "@/lib/hooks/reduxStore.hooks";
import { useAppSelector } from "@/lib/hooks/reduxStore.hooks";

import { AddTodoForm, TODO_FORM } from "./AddTodoForm";
import { CATEGORY_FORM, AddTodoFormCategory } from "./AddTodoFormCategory";
import AddTodoFormPanel, { PANEL_FORM } from "./AddTodoFormPanel";

import { RootState } from "@/store/store";

const AddTodoDrawer = () => {
  const dispatch = useAppDispatch();
  const {
    componentName,
    componentTitle,
    componentDescription,
    panel_id,
    isDrawerOpen,
  } = useAppSelector((state: any) => state.drawer);
  const closeDrawerHandler = () => {
    dispatch(closeDrawer());
  };

  return (
    <TodoDrawer
      open={isDrawerOpen}
      title={componentTitle}
      description={componentDescription}
      onClose={closeDrawerHandler}
    >
      {componentName === TODO_FORM && <AddTodoForm panel_id={panel_id} />}
      {componentName === CATEGORY_FORM && <AddTodoFormCategory />}
      {componentName === PANEL_FORM && <AddTodoFormPanel />}
    </TodoDrawer>
  );
};

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

const TodoDrawer = ({ open, onClose, title, description, children }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {children}

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open}>
      {/* <DrawerTrigger>Open</DrawerTrigger> */}
      <DrawerContent className="flex flex-col items-center">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddTodoDrawer;
