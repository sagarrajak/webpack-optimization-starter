import { removeTodo, addTodo, getAllTodos } from "./data";
import { clearNewTodoInput, renderTodos, getTodoId } from "./ui";
import { capitalize } from 'lodash';
import { trim } from './herlps';

export function onLoadEventHandler() {
  renderTodos(getAllTodos());
}

export function newTodoEventHandler(event) {
  let text = capitalize(trim(event.target.value));
  addTodo({
    id: Date.now(),
    text: text,
    completed: false,
  });
  renderTodos(getAllTodos());
  clearNewTodoInput();
}

export function removeTodoEventHandler(event) {
  const id = getTodoId(event.target);
  removeTodo(id);
  renderTodos(getAllTodos());
}

export function toggleTodoEventListener(event) {
  const id = getTodoId(event.target);
  const isCompleted = event.target.checked;
  updateTodo(id, isCompleted);
  renderTodos(getAllTodos());
}
