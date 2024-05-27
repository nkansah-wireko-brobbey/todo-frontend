'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openDrawer } from '@/store/reducers/drawer.slice';
import Todo from './Todo';
import { useAppSelector } from '@/lib/hooks/reduxStore.hooks'
import { TODO_FORM } from './AddTodoForm';


type Props = {
  title: string;
  id: number,
  todos?: any[]
}

export default ({title, id, todos}: Props) => {

    const dispatch = useDispatch();
    const openDrawerHandler = () => {
        dispatch(openDrawer({componentName: TODO_FORM, componentTitle: 'Add Todo', componentDescription: 'Add a new todo', panel_id: id}));
    }


  return (
    <div>

    <div className='panel'>
        <div className="title">
            <div>{title}</div>
            <div>
            <Button variant="ghost" size="icon" className='rounded-full h-7 w-7'
            onClick={openDrawerHandler}
            ><Plus size={12}/></Button>

            </div>

        </div>
        <div className="content">
          {
            todos?.map((todo: any) => {
              return <Todo key={todo.id} data={todo} />
            })
          }
        </div>

    </div>
    </div>
  )
}


