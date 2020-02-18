import {Instance, types} from 'mobx-state-tree';

const Todo = types.model('Todo', {
  id: types.string,
  title: types.optional(types.string, ''),
  completed: types.optional(types.boolean, false),
}).actions(self => ({
  setTitle(title: string) {
    self.title = title;
  },
  toggle() {
    self.completed = !self.completed;
  }
}));

export type TTodo = Instance<typeof Todo>


export default Todo;
