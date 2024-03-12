import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { deleteBooking, editBooking, getBooking, getBookings, newBooking } from './bookingsThunk';
import { BookingsState } from '../interfaces';

const DEFAULT_STATE: BookingsState = {
    data: [],
    item: {
        itemData: undefined,
        status: 'idle',
        error: null
    },
    loading: false,
    status: 'idle',
    error: null,
};

const initialState: BookingsState = (() => {
    const persistedState = localStorage.getItem("__hotel__app__state__");
    return (persistedState) ? JSON.parse(persistedState)["bookings"] : DEFAULT_STATE;
})();

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBookings.pending, (state) => {
                state.loading = true;
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'fulfilled';
                state.error = null;
                state.data = action.payload;
            })
            .addCase(getBookings.rejected, (state, action) => {
                state.loading = false;
                state.status = 'rejected';
                state.error = action.error?.message ?? "Unknown error occurred";
            })

            .addCase(getBooking.pending, (state) => {
                state.item.status = 'pending';
                state.item.error = null;
            })
            .addCase(getBooking.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.item.itemData = action.payload;
            })
            .addCase(getBooking.rejected, (state, action) => {
                state.item.status = 'rejected';
                state.item.error = action.error?.message ?? "Unknown error occurred";
            })

            .addCase(newBooking.pending, (state) => {
                state.item.status = 'pending';
                state.item.error = null;
            })
            .addCase(newBooking.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.data = [
                    ...state.data,
                    action.payload 
                ];
            })
            .addCase(newBooking.rejected, (state, action) => {
                state.item.status = 'rejected';
                state.item.error = action.error?.message ?? "Unknown error occurred";
            })

            .addCase(editBooking.pending, (state) => {
                state.item.status = 'pending';
                state.item.error = null;
            })
            .addCase(editBooking.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.data = action.payload;
            })
            .addCase(editBooking.rejected, (state, action) => {
                state.item.status = 'rejected';
                state.item.error = action.error?.message ?? "Unknown error occurred";
            })

            .addCase(deleteBooking.pending, (state) => {
                state.item.status = 'pending';
                state.item.error = null;
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.data = state.data.filter(item => item.id !== action.payload);
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.item.status = 'rejected';
                state.item.error = action.error?.message ?? "Unknown error occurred";
            })
    },
});

export const selectBookings = (state: RootState) => state.bookings;
export const selectBooking = (state: RootState) => state.bookings.item;

export default bookingsSlice.reducer;