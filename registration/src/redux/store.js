import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { student } from "./student/reducers";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'

const reducers = {
    student
}

const rootReducer = combineReducers(reducers);

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const configureStore = () => createStore(
    persistedReducer, 
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

