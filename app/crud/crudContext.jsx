import { createContext, useReducer, useContext } from "react";
import crudReducer from "./crudReducer";

const CrudContext = createContext();

export function CrudProvider({ children }) {
  const [state, dispatch] = useReducer(crudReducer, { items: [] });

  return (
    <CrudContext.Provider value={{ state, dispatch }}>
      {children}
    </CrudContext.Provider>
  );
}

export function useCrud() {
  return useContext(CrudContext);
}
