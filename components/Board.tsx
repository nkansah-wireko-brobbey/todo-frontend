'use client'

import React from 'react'
import Panel from './Panel'
import AddTodoDrawer from './AddTodoDrawer'
import { useQuery } from '@apollo/client'
import { GET_TODOS, GET_CATEGORIES } from '@/lib/graphql/queries'
import { BoardLoading } from './Loading'

const Board = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  console.log(data)

  return (
    <>
    {loading && <BoardLoading/>}


    {!loading && 
    <><div className='board'>
          <Panel />
          <Panel />
          <Panel />
          <Panel />
        </div><AddTodoDrawer /></>
    
    }
    </>

  )
}

export default Board