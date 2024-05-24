import React from 'react'
import Panel from './Panel'
import AddTodoDrawer from './AddTodoDrawer'

const Board = () => {
  return (
    <>
    <div className='board'>
        <Panel />
        <Panel />
        <Panel />
        <Panel />
    </div>
    <AddTodoDrawer />
    </>

  )
}

export default Board