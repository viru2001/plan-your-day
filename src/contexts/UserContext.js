import { createContext, useContext,  useReducer } from "react";
import { userReducer, userInitialState } from "../reducers/index";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
