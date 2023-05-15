import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { clearResults } from './Reducers/UserReducer';
import postReducer from './Reducers/PostReducer';
import storage from 'redux-persist/lib/storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {persistReducer} from 'redux-persist';
import {persistStore} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage
}

const userPersistConfig = {
    key: 'user',
    storage,
    blacklist: ['errorData']
}

// export const api = createApi({
//     reducerPath: 'api',
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081' }),
//     tagTypes: ['user', 'post'],
//     endpoints: () => ({}),
// });

const rootReducer = combineReducers({
    userReducer: persistReducer(userPersistConfig, userReducer),
    postReducer: postReducer
});

const rootAppReducer = (state, action) => {
    console.log(action.type)
    if (action.type === 'user/clearResults') {
        // for all keys defined in your persistConfig(s)
        storage.removeItem('persist:root')
        // storage.removeItem('persist:otherKey')
        state = {}

        return rootReducer(undefined, action);
    }
    return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootAppReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);