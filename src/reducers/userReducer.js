const userInitialState = {
  name: localStorage.getItem("name") || "",
  isNameSaved: localStorage.getItem("isNameSaved") || false,
};
const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "EDIT_USERNAME":
      return { ...state, name: payload };
    case "SAVE_NAME":
      return { ...state, isNameSaved: true };
    default:
      return state;
  }
};

export { userReducer, userInitialState };
