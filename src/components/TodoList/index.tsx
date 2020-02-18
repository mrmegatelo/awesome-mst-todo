import React from 'react';
import AddItemInput from "../AddItemInput";
import Item from "../Item";
import {observer} from "mobx-react-lite";
import {useMst} from "../../store";


const TodoList = () => {
  const {
    getCompletedCount,
    completeTodos,
    uncompletedTodos,
    removeTodo,
    addTodo
  } = useMst();
  
  const addItem = (name: string) => {
    addTodo(name)
  };
  
  return (
    <div id="items-outer-container">
      <div id="items-container" className="scroll-bar">
        <AddItemInput addItem={addItem}/>
        <div id="items">
          <div
            id="items-uncompleted__spacer"
          />
          {uncompletedTodos.map((item, index) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.title}
              isCompleted={item.completed}
              toggleItem={item.toggle}
              editItem={item.setTitle}
              deleteItem={() => removeTodo(item)}
            />
          ))}
          <div id="items-completed__header">
            <h1>{getCompletedCount()}</h1>
          </div>
          <div
            id="items-completed__spacer"
          />
          {completeTodos.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.title}
              isCompleted={item.completed}
              toggleItem={item.toggle}
              editItem={item.setTitle}
              deleteItem={() => removeTodo(item)}
            />
          ))}
        </div>
      </div>
    </div>
  )
};

export default observer(TodoList);
