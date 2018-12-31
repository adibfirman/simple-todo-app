import React, { useState, useEffect, useContext } from 'react';
import { Input, Button } from 'antd';

import { TodosContext } from '../context';

const Form = () => {

  const {dispatch, todos} = useContext(TodosContext)
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    let todosFromStorage = JSON.parse(localStorage.getItem('todoList'))
    dispatch({ type: 'reset', todos: todosFromStorage || [] })
  }, [])

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todos))
  }, [todos])

  function handleEnterPress(e) {
    if (e.key === 'Enter' && newTodo) {
      dispatch({ type: 'create', text: newTodo})
    }
  }

  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '1em 0' }}>
        <Input
          placeholder="Enter A Todo Name..."
          value={newTodo}
          onKeyDown={handleEnterPress}
          style={{ width: '40%' }}
          onChange={e => setNewTodo(e.target.value)} />
        <Button
          disabled={!newTodo}
          onClick={() => dispatch({ type: 'create', text: newTodo })} type="primary">Create Todo</Button>
      </div>
    </React.Fragment>
  )

}

export default Form
