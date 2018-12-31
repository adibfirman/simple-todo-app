import React from 'react';

import {TodosProvider} from './context'
import List from './components/List'
import Header from './components/Header'
import Form from './components/Form'

const App = () => {

  return (
    <TodosProvider>
      <Header />
      <Form />
      <List />
    </TodosProvider>
  )

}

export default App
