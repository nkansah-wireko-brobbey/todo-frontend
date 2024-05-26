'use client'

import React, { useEffect } from 'react'
import Panel from './Panel'
import AddTodoDrawer from './AddTodoDrawer'
import { useQuery } from '@apollo/client'
import { GET_TODOS, GET_CATEGORIES } from '@/lib/graphql/queries'
import { BoardLoading } from './Loading'
import { useDispatch } from 'react-redux'
import { fetchPanels } from '@/store/reducers/panel.slice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxStore.hooks'
import { Badge } from "@/components/ui/badge"
import { openDrawer } from '@/store/reducers/drawer.slice';
import { CATEGORY_FORM } from './AddTodoFormCategory';
import { fetchCategories } from '@/store/reducers/category.slice'



const Board = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  console.log(data)


  const dispatch = useAppDispatch();

  const panels: any[] = useAppSelector((state) => state.panels.data);

  console.log(panels)

  useEffect(() => {  
      dispatch(fetchPanels())  
      dispatch(fetchCategories())  
  }, [])



  return (
    <>
    <BoardMenu />
    {loading && <BoardLoading/>}


    {!loading && data &&
    <><div className='board'>
          {
            panels.map((panel: any) => {
              return <Panel key={panel.id} title={panel.name} id={panel.id} todos={panel.todos} />
            })
          }
          
        </div></>
    
    }
    <AddTodoDrawer />
    </>

  )
}


export const BoardMenu = () => {

  const dispatch = useDispatch();
  const openCategoryForm = () => {
      dispatch(openDrawer({componentName: CATEGORY_FORM, componentTitle: 'Add Categories', componentDescription: 'Wanna add a special tag to your todo?', panelId: null}));
  }
  return (
    <div className='float-end mb-5'>
<Badge variant="outline" className='rounded-md cursor-pointer' onClick={openCategoryForm}>Add Category</Badge>
    </div>
  )
}


export default Board