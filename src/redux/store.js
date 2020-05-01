import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'
import logger from 'redux-logger';
import rootReducer from './root-reducer'
import createSagaMiddleware from 'redux-saga';
import { fetchCollectsStart } from './shop/shop.sagas'

const sagaMiddleWare = createSagaMiddleware();

const middlewares = [sagaMiddleWare];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleWare.run(fetchCollectsStart)

export const persistor = persistStore(store)

export default { store, persistor };
