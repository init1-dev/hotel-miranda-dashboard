import { configureStore, type Middleware } from "@reduxjs/toolkit";
import bookingsReducer from './Bookings/bookingsSlice';
import employeesReducer from './Employees/employeesSlice';
import roomsReducer from './Rooms/roomsSlice';
import messagesReducer from './Messages/messagesSlice';
import { HotelState } from "./interfaces";

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    next(action);
    const initAppState = localStorage.getItem('__hotel__app__state__');

    const initState: HotelState = initAppState ? JSON.parse(initAppState) : {
        auth: null,
        app: null
    };
    
    localStorage.setItem("__hotel__app__state__", JSON.stringify({
        ...initState,
        app: {
            bookings: store.getState().bookings,
            employees: store.getState().employees,
            messages: store.getState().messages,
            rooms: store.getState().rooms
        }
    }));
}

export const store = configureStore({
    reducer: {
        bookings: bookingsReducer,
        employees: employeesReducer,
        rooms: roomsReducer,
        messages: messagesReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(persistanceLocalStorageMiddleware)
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;