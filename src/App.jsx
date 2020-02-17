import React, { useState } from 'react';
import {Helmet} from 'react-helmet';
import filter from 'lodash/filter';
import Item from './components/Item';
import AddItemInput from "./components/AddItemInput";

const initialState = [
  {id: 1, name: 'Go to the store', isCompleted: false },
  {id: 2, name: 'Walk the dog', isCompleted: false },
  {id: 3, name: 'Hit the gym', isCompleted: false },
];

const getCompleted = (items) => filter(items, { isCompleted: true });
const getUncompleted = (items) => filter(items, { isCompleted: false });
const getItemCountText = (items) => {
  if (items.length === 0) {
    return 'No completed items'
  }

  const pluralText = items.length === 1 ? 'item' : 'items';
  return `${items.length} completed ${pluralText}`
}

const TodoList = () => {
 const [items, setItems] = useState(initialState);

  const toggleItem = (id) => {
    const updatedItems = items
      .map(item => ({...item, isCompleted: item.id === id ? !item.isCompleted : item.isCompleted}));
    setItems(updatedItems)
  };

  const addItem = (name) => {
    let updatedItems = [...items];
    updatedItems.unshift({id: 0, name, isCompleted: false});
    updatedItems = updatedItems.map((item, index) => {
      return {...item, id: index + 1};

    });
    setItems(updatedItems);
  };

  const editItem = (id, name) =>  {
    const updatedItems = items.map(item => ({...item, name: item.id === id ? name : item.name}));
    this.setState(updatedItems)
  };

  const deleteItem = (id) => {
    let updatedItems = [...items].filter(item => item.id !== id)
    this.setState({ updatedItems })
  }

  const completed = getCompleted(items);
  const uncompleted = getUncompleted(items);

  const itemCountText = getItemCountText(completed);

  return (
    <div id="app">
      <Helmet>
        <title>Awesome Todo</title>
        <link rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?fa></scriptmily=Roboto:100,300,400,700" />
        <script src="https://use.fontawesome.com/releases/v5.1.1/js/all.js" />
      </Helmet>
      <div id="items-outer-container">
        <div id="items-container" className="scroll-bar">
          <AddItemInput addItem={addItem}/>
          <div id="items">
            <div
              id="items-uncompleted__spacer"
            />
            {uncompleted.map((item, index) => (
              <Item
                key={item.id}
                id={item.id}
                index={index}
                name={item.name}
                isCompleted={item.isCompleted}
                toggleItem={() => toggleItem(item.id)}
                editItem={editItem}
                deleteItem={() => deleteItem(item.id)}
              />
            ))}
            <div id="items-completed__header">
              <h1>{itemCountText}</h1>
            </div>
            <div
              id="items-completed__spacer"
            />
            {completed.map((item, index) => (
              <Item
                key={item.id}
                id={item.id}
                index={index}
                name={item.name}
                isCompleted={item.isCompleted}
                toggleItem={() => toggleItem(item.id)}
                editItem={editItem}
                deleteItem={() => deleteItem(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <div id="app__background-accent"/>
    </div>
  )
};

export default TodoList;
