import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux";
import initState from "./initState";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer, initState(), composeWithDevTools());

export default store;
