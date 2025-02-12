import { reactive } from 'vue';
import { TodoStatus } from './enums';

interface Todo {
  text: string;
  status: TodoStatus;
}

interface Category {
  name: string;
  newTodo: string;
  todos: Todo[];
}

export interface State {
  categories: Category[];
  newCategoryName: string;
  draggedTodoIndex: number | null;
  editingTodo: Todo | null;
  editingText: string;
}

class TodoStore {
  state: State = reactive({
    categories: [],
    newCategoryName: '',
    draggedTodoIndex: null,
    editingTodo: null,
    editingText: '',
  });

  constructor() {
    this.loadState();
  }

  saveState = () => localStorage.setItem('todoState', JSON.stringify(this.state));

  loadState = () => {
    const savedState = localStorage.getItem('todoState');
    if (savedState) Object.assign(this.state, JSON.parse(savedState));
  };

  addCategory = () => {
    const name = this.state.newCategoryName.trim();
    if (name && !this.state.categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      this.state.categories.push({ name, todos: [], newTodo: '' });
      this.state.newCategoryName = '';
      this.saveState();
    } else if (name) alert('Category already exists!');
  };

  addTodo = (category: Category) => {
    const text = category.newTodo.trim();
    if (text && !category.todos.some((t) => t.text.toLowerCase() === text.toLowerCase())) {
      category.todos.push({ text, status: TodoStatus.PENDING });
      category.newTodo = '';
      this.saveState();
    } else if (text) alert('This To-Do already exists!');
  };

  removeCategory = (index: number) =>
    confirm('Are you sure you want to delete this category?') &&
    this.state.categories.splice(index, 1) &&
    this.saveState();

  removeTodo = (category: Category, index: number) =>
    confirm('Are you sure you want to delete this To-Do?') &&
    category.todos.splice(index, 1) &&
    this.saveState();

  toggleTodoStatus = (todo: Todo) => {
    todo.status =
      todo.status === TodoStatus.PENDING ? TodoStatus.COMPLETED : TodoStatus.PENDING;
    this.saveState();
  };

  startEditing = (todo: Todo) => {
    this.state.editingTodo = todo;
    this.state.editingText = todo.text;
  };

  saveEdit = (category: Category, index: number) => {
    const text = this.state.editingText.trim();
    if (text && !category.todos.some((t, i) => t.text.toLowerCase() === text.toLowerCase() && i !== index)) {
      category.todos[index].text = text;
      this.state.editingTodo = null;
      this.state.editingText = '';
      this.saveState();
    } else if (text) alert('This To-Do already exists!');
  };

  cancelEdit = () => {
    this.state.editingTodo = null;
    this.state.editingText = '';
  };

  dragStart = (_: Category, index: number) => {
    this.state.draggedTodoIndex = index;
  };

  drop = (category: Category, index: number) => {
    if (this.state.draggedTodoIndex !== null) {
      const [todo] = category.todos.splice(this.state.draggedTodoIndex, 1);
      category.todos.splice(index, 0, todo);
      this.state.draggedTodoIndex = null;
      this.saveState();
    }
  };
}

export const todoStore = new TodoStore();
