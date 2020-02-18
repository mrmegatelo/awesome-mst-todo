import React, { useState, FC } from 'react';
import ItemNameInput from '../ItemNameInput';
import { observer } from "mobx-react-lite";
import cx from 'classnames';

interface IItem {
  name: string;
  id: string;
  isCompleted: boolean;
  toggleItem: () => void;
  deleteItem: () => void;
  editItem: (name: string) => void;
}

const Item: FC<IItem> = ({ name, id, isCompleted, toggleItem, deleteItem, editItem }) => {
  const [ isEditing, setEditing ] = useState(false);
  const toggleEdit = () => setEditing(!isEditing);
  
  const className = cx('item', { completed: isCompleted  }, { editing: isEditing });

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
  );

  return(
    <div
      className={className}
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
};

export default observer(Item);
