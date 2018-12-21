import React, { Component } from 'react';
import ListItem from '../ListItem'

class App extends Component {

  state = {
    newTodo: '',
    updateTodo: {
      stat: false,
      index: ''
    },
    todos: [
      {
        id: 1,
        name: 'Play golf'
      },
      {
        id: 2,
        name: 'Buy some clothes'
      },
      {
        id: 3,
        name: 'Write some code'
      }
    ]
  }

  get actionTodo() {
    return !this.state.updateTodo.stat ? this.handleAddTodo : this.handleUpdateTodo
  }

  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleAddTodo = () => {
    const { newTodo, todos } = this.state
    const oldTodos = todos
    oldTodos.unshift({
      id: Math.random(),
      name: newTodo
    })

    this.setState({
      todos: oldTodos,
      newTodo: ''
    })
  }

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.actionTodo()
    }
  }

  removeTodos = index => {
    const { todos } = this.state
    delete todos[index]

    this.setState({ todos })
  }

  updateTodos = index => {
    const { todos } = this.state
    const detailTodo = todos[index]
    this.setState({
      updateTodo: {
        index,
        stat: true
      },
      newTodo: detailTodo.name
    })
  }

  handleUpdateTodo = () => {
    const { todos, updateTodo, newTodo } = this.state
    const oldTodos = todos
    oldTodos[updateTodo.index].name = newTodo

    this.setState({
      updateTodo: {
        stat: false,
        index: ''
      },
      todos: oldTodos,
      newTodo: ''
    })
  }

  render() {
    const { todos, newTodo, updateTodo } = this.state
    const classNameAddTodo = !newTodo ? 'btn-disabled' : 'btn-primary'

    return (
      <div className="container">
        <div style={styles.container}>
          <div style={{ display: 'flex' }}>
            <input
              onKeyPress={this.handleKeyDown}
              type="text"
              name="newTodo"
              value={newTodo}
              className="form-control"
              placeholder="Add A New TODO"
              onChange={this.handleOnChange} />
          </div>
          <div style={{ display: 'flex' }}>
            <button
              disabled={!newTodo}
              onClick={this.actionTodo}
              className={`form-control ${classNameAddTodo}`}>
              { updateTodo.stat ? 'Update Todo' : 'Add Todo' }
            </button>
          </div>
        </div>
        <div className="container">
        {
          !updateTodo.stat &&
          <ul className="list-group">
            {todos.map((item, index) => (
              <ListItem
                key={item.id}
                name={item.name}
                index={index}
                updateTodos={this.updateTodos}
                removeTodos={this.removeTodos} />
            ))}
          </ul>
        }
        </div>
      </div>
    );
  }

}

const styles = ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between'
  }
})

export default App;
