export default function crudReducer(state, action) {
    switch (action.type) {
      case "ADD_ITEM":
        return { items: [...state.items, action.payload] };
      case "DELETE_ITEM":
        return { items: state.items.filter((item) => item.id !== action.payload) };
      case "UPDATE_ITEM":
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        };
      default:
        return state;
    }
  }
  