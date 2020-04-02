import { GET_TODOS, ADD_TODO, REMOVE_TODO } from './index';

export const getTodos = (todos) => ({ type: GET_TODOS, todos });
export const addTodo = (todo) => ({ type: ADD_TODO, todo });
export const removeTodo = (todo) => ({ type: REMOVE_TODO, todo });
