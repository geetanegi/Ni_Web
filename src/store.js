// store.js
 
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {thunk} from 'redux-thunk';
 
import rootReducer from './reducers/index'; // Assuming you have a 'reducers' folder with your root reducer
 
// Redux persist configuration
const persistConfig = {
  key: 'root',
  storage,
  // You can add other configuration options if needed
};
 
const persistedReducer = persistReducer(persistConfig, rootReducer);
 
// Redux DevTools Extension setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 
// Middleware setup (you can add more middleware as needed)
const middleware = [thunk];
 
// Store creation
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
 
// Persistor creation for redux-persist
const persistor = persistStore(store);
 
export { store, persistor };