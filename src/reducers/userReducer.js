const userInitialState = {
  name: localStorage.getItem("name") || "",
  isNameSaved: JSON.parse(localStorage.getItem("isNameSaved")) || false,
  focus: localStorage.getItem("focus") || "",
  isFocusSaved: JSON.parse(localStorage.getItem("isFocusSaved")) || false,
  isFocusDone: JSON.parse(localStorage.getItem("isFocusDone")) || false,
  showNameEditIcon: false,
  showNameField: false,
  showFocusIcons: false,
  quote: "",
  quoteAuthor: "",
  weather: {},
  todos: JSON.parse(localStorage.getItem("todos")) || [],
};

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "EDIT_USERNAME":
      return { ...state, name: payload };
    case "SAVE_NAME":
      return { ...state, isNameSaved: true };
    case "SHOW_NAME_EDIT_ICON":
      return { ...state, showNameEditIcon: payload };
    case "SHOW_NAME_FIELD":
      return { ...state, showNameField: payload };
    case "EDIT_FOCUS":
      return { ...state, focus: payload };
    case "SAVE_FOCUS_STATUS":
      return { ...state, isFocusSaved: payload };
    case "SET_FOCUS_DONE_STATUS":
      return { ...state, isFocusDone: payload };
    case "SHOW_FOCUS_ICONS":
      return { ...state, showFocusIcons: payload };
    case "DELETE_FOCUS":
      return { ...state, focus: "" };
    case "SET_QUOTE":
      return { ...state, quote: payload };
    case "SET_QUOTE_AUTHOR":
      return { ...state, quoteAuthor: payload };
    case "UPDATE_WEATHER":
      return { ...state, weather: payload };
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, payload] };
    case "UPDATE_TODO_STATUS":
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === payload ? { ...todo, isDone: !todo.isDone } : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter(todo => todo.title !== payload),
      };
    default:
      return state;
  }
};

export { userReducer, userInitialState };
