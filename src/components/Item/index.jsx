import React, { useState } from 'react';
import ItemNameInput from '../ItemNameInput';

const Item = ({ name, id, height, isCompleted, toggleItem, deleteItem, editItem }) => {
  const [ isEditing, setEditing ] = useState(false);
  const toggleEdit = () => setEditing(!isEditing);

  let classes = isCompleted ? "item completed" : "item";

  classes = isEditing ? `${classes} editing` : classes

  const itemName = isEditing ? (
    <ItemNameInput
      id={id}
      name={name}
      height={height}
      editItem={editItem}
      toggleEdit={toggleEdit}
    />
  ) : (
    <div className="item-name" onDoubleClick={!isCompleted ? toggleEdit : null}>
      <h1>{name}</h1>
    </div>
  )

  return(
    <div
      className={classes}
    >
      <div className="item-icon" onClick={toggleItem}>
        <i className="far fa-circle uncompleted"/>
        <i className="fas fa-check completed"/>
      </div>
      {itemName}
      <div className="item-edit" onClick={toggleEdit}>
        <i className="fas fa-pen"/>
      </div>
      <div className="item-delete" onClick={deleteItem}>
        <i className="fas fa-times-circle"/>
      </div>
    </div>
  )
}

export default Item;
