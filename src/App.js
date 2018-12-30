import React, { useReducer, useState, useContext, useEffect } from 'react';

function reducerApp(state, payload) {
  switch (payload.type) {
    case 'reset':
      return payload.todos
    case 'create':
      return [
        {
          id: Date.now(),
          text: payload.text,
          complete: false
        },
        ...state
      ]
    case 'complete':
      return state.map(todo => {
        return {
          ...todo,
          complete: !todo.complete
        }
      })
    case 'delete':
      return state.filter(todo => todo.id !== payload.id)
    default:
      return state
  }
}

const Context = React.createContext()

const App = () => {

  const [todos, dispatch] = useReducer(reducerApp, [])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    const oldTodos = localStorage.getItem('todoList')
    dispatch({ type: 'reset', todos: JSON.parse(oldTodos) })
  }, [])

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todos))
  }, [todos])

  return (
    <Context.Provider value={dispatch}>
      <h1>Perry's Simple Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)} />
      <button onClick={() => dispatch({ type: 'create', text: newTodo })}>Create New Todo</button>
      <List data={todos} />
    </Context.Provider>
  )

}

const List = ({ data }) => {
  return data.map(todo => <Item key={todo.id} {...todo} />)
}

const Item = ({ id, text, complete }) => {

  const dispatch = useContext(Context)

  return (
    <div>
      <input
        type="checkbox"
        value={complete}
        onClick={() => dispatch({ type: 'complete', id })} />
      <label style={{ textDecoration: complete ? 'line-through' : 'none' }}>{text}</label>
      <button onClick={() => dispatch({ type: 'delete', id })}>delete</button>
    </div>
  )

}

export default App
