
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import CombineReducer from './reducer/CombineReducer';
let enhancers;
if (window.location.origin.includes("localhost")) {
    enhancers = [window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk),];
        
}
else { enhancers = [applyMiddleware(thunk)]; }
const Store = createStore(CombineReducer, compose(...enhancers));
export default Store;

