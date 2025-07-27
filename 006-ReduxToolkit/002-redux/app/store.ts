import { configureStore } from '@reduxjs/toolkit';

import cakeReducer from '../features/cake/cakeSlice';
import iceCreamReducer from "../features/iceCream/iceCreamSlice";
import userReducer from "../features/user/userSlice";

import { createLogger } from 'redux-logger';

const logger = createLogger();

export const store = configureStore({
    reducer: {
        cake: cakeReducer,
        iceCream: iceCreamReducer,
        user: userReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
