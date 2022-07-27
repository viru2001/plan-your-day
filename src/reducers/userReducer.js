const userInitialState = {
  name: localStorage.getItem("name") || "",
  isNameSaved: localStorage.getItem("isNameSaved") || false,
  showEditIcon: false,
  showNameField: false,
};
const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "EDIT_USERNAME":
      return { ...state, name: payload };
    case "SAVE_NAME":
      return { ...state, isNameSaved: true };
    case "SHOW_EDIT_ICON":
      return { ...state, showEditIcon: payload };
    case "SHOW_NAME_FIELD":
      return { ...state, showNameField: payload };
    default:
      return state;
  }
};

export { userReducer, userInitialState };
