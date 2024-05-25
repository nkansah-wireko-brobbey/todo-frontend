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

const Board = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  console.log(data)


  const dispatch = useAppDispatch();

  const panels: any[] = useAppSelector((state) => state.panels.data);

  console.log(panels)

  useEffect(() => {  
      dispatch(fetchPanels())    
  }, [])



  return (
    <>
    {loading && <BoardLoading/>}


    {!loading && data &&
    <><div className='board'>
          {
            panels.map((panel: any) => {
              return <Panel key={panel.id} title={panel.name} id={panel.id} todos={panel.todos} />
            })
          }
          
        </div><AddTodoDrawer /></>
    
    }
    </>

  )
}

export default Board