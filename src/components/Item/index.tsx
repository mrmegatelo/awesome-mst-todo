import React, { useState, FC } from 'react';
import ItemNameInput from '../ItemNameInput';

interface IItem {
  name: string;
  id: number;
  isCompleted: boolean;
  toggleItem: () => void;
  deleteItem: () => void;
  editItem: (id: number, name: string) => void;
}

const Item: FC<IItem> = ({ name, id, isCompleted, toggleItem, deleteItem, editItem }) => {
  const [ isEditing, setEditing ] = useState(false);
  const toggleEdit = () => setEditing(!isEditing);

  let classes = isCompleted ? "item completed" : "item";

  classes = isEditing ? `${classes} editing` : classes

  const itemName = isEditing ? (
    <ItemNameInput
      id={id}
      name={name}
      editItem={editItem}
      toggleEdit={toggleEdit}
    />
  ) : (
    <div className="item-name" onDoubleClick={!isCompleted ? toggleEdit : undefined}>
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
