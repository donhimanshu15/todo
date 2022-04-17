

const initialState = {
  tabledata: []
}
const Reducer = (state = initialState, action) => {
  switch (action.type) {

    case "UPDATE_TODO_DATA": {

      return {
        ...state,
        tabledata: action?.payload
      }
    }
    case "REMOVE_TODO": {
      const tabledata = state.tabledata.filter((item) => item.id !== action.payload);
      return {
        ...state,
        tabledata
      }
    }
    case "ADD_TODO": {
      const { id, title } = action.payload;
      return {
        ...state,
        tabledata: [
          ...state.tabledata,
          { title: title, completed: false, id: id }
        ]
      }
    }
    case "UPDATE_TODO": {
      const { id, title } = action.payload;
      const tabledata = state.tabledata.map(obj => obj.id === id ? { ...obj, title: title } : obj);
      return { tabledata }
    }
    case "COMPLETE_TODO": {
      const id = action.payload;
      const tabledata = state.tabledata.map(obj => obj.id === id ? { ...obj, completed: !obj.completed } : obj);
      return { tabledata }
    }
    default:
      return state
  }
}
export default Reducer;