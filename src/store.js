import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { ToDoReducer } from "./reducers/ToDoReducers";

const reducers = combineReducers({
    todo: ToDoReducer,
});

const initialState = {
    todo: { todos: [] },
};

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;