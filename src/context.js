import React, { useReducer } from 'react';

const Context = React.createContext()

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

const TodosProvider = ({ children }) => {

  const [todos, dispatch] = useReducer(reducerApp, [])

  return <Context.Provider value={{ dispatch, todos }}>{children}</Context.Provider>

}

export {TodosProvider, Context as TodosContext}
