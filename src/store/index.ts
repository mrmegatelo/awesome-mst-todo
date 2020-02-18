import {createContext, useContext} from 'react';
import {destroy, Instance, types} from 'mobx-state-tree';
import Todo, {TTodo} from './Todo';
import nanoid from 'nanoid';

const RootModel = types.model('Root', {
  todos: types.array(Todo),
}).actions(self => ({
  addTodo(title: string) {
    self.todos.unshift(Todo.create({title, id: nanoid()}));
  },
  removeTodo(Todo: TTodo) {
    destroy(Todo);
  }
})).views(self => ({
  get completeTodos() {
    return self.todos.filter(todo => todo.completed);
  },
  get uncompletedTodos() {
    return self.todos.filter(todo => !todo.completed);
  },
})).views(self => ({
  getCompletedCount() {
    if (self.completeTodos.length === 0) {
      return 'No completed items'
    }
    
    const pluralText = self.completeTodos.length === 1 ? 'item' : 'items';
    return `${self.completeTodos.length} completed ${pluralText}`
  }
}));

const initialState = [
  {id: nanoid(), title: 'Go to the store', completed: false},
  {id: nanoid(), title: 'Walk the dog', completed: false},
  {id: nanoid(), title: 'Hit the gym', completed: false},
];

export const RootStore = RootModel.create({todos: initialState});
export type RootInstance = Instance<typeof RootStore>;

const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
