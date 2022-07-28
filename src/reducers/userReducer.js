const userInitialState = {
  name: localStorage.getItem("name") || "",
  isNameSaved: JSON.parse(localStorage.getItem("isNameSaved")) || false,
  focus: localStorage.getItem("focus") || "",
  isFocusSaved: JSON.parse(localStorage.getItem("isFocusSaved")) || false,
  isFocusDone: JSON.parse(localStorage.getItem("isFocusDone")) || false,
  showNameEditIcon: false,
  showNameField: false,
  showFocusIcons: false,
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
    default:
      return state;
  }
};

export { userReducer, userInitialState };
