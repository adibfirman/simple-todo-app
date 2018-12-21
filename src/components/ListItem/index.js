import React from 'react'

const ListItem = ({ name, index, updateTodos, removeTodos }) => (
  <li
    style={styles.listItem}
    className="list-group-item">
    <span>{name}</span>
    <div style={styles.containerAction}>
      <button
        onClick={() => updateTodos(index)}
        className="btn btn-sm btn-info">
        <ion-icon name="create"></ion-icon>
      </button>
      <button
        onClick={() => removeTodos(index)}
        className="btn btn-sm btn-danger">
        <ion-icon name="trash"></ion-icon>  
      </button>
    </div>
  </li>
)

const styles = ({
  containerAction: {
    display: 'flex',
    width: 65,
    justifyContent: 'space-between'
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textTransform: 'capitalize'
  }
})

export default ListItem
