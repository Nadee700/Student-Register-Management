import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { student } from "./student/reducers";

const reducers = {
    student
}

const rootReducer = combineReducers(reducers);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)
 
 export default store;

