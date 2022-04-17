import Reducer from "./todoReducer";
import { combineReducers} from "redux";

const CombineReducers=combineReducers({
    reducer: Reducer,
});
export default CombineReducers;