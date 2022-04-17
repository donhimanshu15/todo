import axios from "axios"

export const getTodoList=async()=>{
let response= await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5")
return response;
}