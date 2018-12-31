import React, { useContext } from 'react';
import { Button, Checkbox } from 'antd';
import IconDelete from 'react-ionicons/lib/MdTrash';

import { TodosContext } from '../context';

const Item = ({ id, text, complete }) => {

  const {dispatch} = useContext(TodosContext)

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '40em', margin: '0.6em 0' }}>
      <Checkbox
        checked={complete}
        onChange={() => dispatch({ type: 'complete', id })}>
        <label style={{ textDecoration: complete ? 'line-through' : 'none' }}>{text}</label>
      </Checkbox>
      <Button
        color="red"
        shape="circle"
        size="small"
        onClick={() => dispatch({ type: 'delete', id })}>
        <IconDelete fontSize="12px" />
      </Button>
    </div>
  )

}

export default Item
