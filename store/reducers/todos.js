import { GET_TODOS, ADD_TODO, REMOVE_TODO } from '../actions';

export default function (state = [], action) {
  const { type, todo, todos } = action;

  switch (type) {
    case GET_TODOS:
      return todos.map((item) => ({ id: item.id, text: item.title }));
    case ADD_TODO:
      return [
        {
          id: todo.id,
          text: todo.title,
        },
        ...state,
      ];
    case REMOVE_TODO:
      return state.filter((i) => i !== todo);
    default:
      return state;
  }
}
