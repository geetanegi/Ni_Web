import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
 
import rootReducer from "./index";
 
const persistConfig = {
  key: "root",
  storage,
};
 
const persistedReducer = persistReducer(persistConfig, rootReducer);
 
let store = createStore(persistedReducer, applyMiddleware(logger));
let persistor = persistStore(store);
 
export { store, persistor };