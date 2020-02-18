import React, {useState} from 'react';
import AddItemInput from "../AddItemInput";
import Item from "../Item";
import filter from "lodash/filter";

type TodoItem = {
    id: number;
    name: string;
    isCompleted: boolean;
}

const initialState = [
    {id: 1, name: 'Go to the store', isCompleted: false },
    {id: 2, name: 'Walk the dog', isCompleted: false },
    {id: 3, name: 'Hit the gym', isCompleted: false },
];

const getCompleted = (items: TodoItem[]) => filter(items, { isCompleted: true });
const getUncompleted = (items: TodoItem[]) => filter(items, { isCompleted: false });
const getItemCountText = (items: TodoItem[]): string => {
    if (items.length === 0) {
        return 'No completed items'
    }

    const pluralText = items.length === 1 ? 'item' : 'items';
    return `${items.length} completed ${pluralText}`
};

const TodoList = () => {
    const [items, setItems] = useState<TodoItem[]>(initialState);

    const toggleItem = (id: number) => {
        const updatedItems = items
            .map(item => ({...item, isCompleted: item.id === id ? !item.isCompleted : item.isCompleted}));
        setItems(updatedItems)
    };

    const addItem = (name: string) => {
        let updatedItems = [...items];
        updatedItems.unshift({id: 0, name, isCompleted: false});
        updatedItems = updatedItems.map((item, index) => {
            return {...item, id: index + 1};

        });
        setItems(updatedItems);
    };

    const editItem = (id: number, name: string) => {
        const updatedItems = items.map(item => ({...item, name: item.id === id ? name : item.name}));
        setItems(updatedItems);
    };

    const deleteItem = (id: number) => {
        let updatedItems = [...items].filter(item => item.id !== id);
        setItems(updatedItems)
    };

    const completed = getCompleted(items);
    const uncompleted = getUncompleted(items);

    const itemCountText = getItemCountText(completed);
    return (
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
    )
};

export default TodoList;
