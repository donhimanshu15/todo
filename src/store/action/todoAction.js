export const getTodos = (payload) => {
    return { type: "UPDATE_TODO_DATA", payload }
}

export const removeTodos = (payload) => {
    return { type: "REMOVE_TODO", payload }
}
export const addTodos = (payload) => {
    return { type: "ADD_TODO", payload }
}
export const updateTodos = (payload) => {
    return { type: "UPDATE_TODO", payload }
}
export const completeTodos = (payload) => {
    return { type: "COMPLETE_TODO", payload }
}