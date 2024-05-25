'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openDrawer } from '@/store/reducers/drawer.reducer';
import Todo from './Todo';

export default () => {

    const dispatch = useDispatch();

    const openDrawerHandler = () => {
        dispatch(openDrawer());
    }
  return (
    <div className='panel'>
        <div className="title">
            <div>In Progress</div>
            <div>
            <Button variant="ghost" size="icon" className='rounded-full h-7 w-7'
            onClick={openDrawerHandler}
            ><Plus size={12}/></Button>

            </div>

        </div>
        <div className="content">
          <Todo />
        </div>

    </div>
  )
}


