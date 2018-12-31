import React, { useContext } from 'react';

import Item from './Item'
import { TodosContext } from '../context';

const List = () => {
  const { todos } = useContext(TodosContext)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {todos.map(todo => <Item key={todo.id} {...todo} />)}
    </div>
  )
}

export default List
