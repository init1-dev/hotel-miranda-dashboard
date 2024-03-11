import { configureStore, type Middleware } from "@reduxjs/toolkit";
import bookingsReducer from './Bookings/bookingsSlice';

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    next(action);
    localStorage.setItem("__hotel__app__state__", JSON.stringify(store.getState()))
}

export const store = configureStore({
    reducer: {
        bookings: bookingsReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(persistanceLocalStorageMiddleware)
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;