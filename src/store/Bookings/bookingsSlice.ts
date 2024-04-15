import { createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
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

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: DEFAULT_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBookings.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.data = action.payload;
            })

            .addCase(getBooking.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.item.itemData = action.payload;
            })

            .addCase(newBooking.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.data = [
                    ...state.data,
                    action.payload 
                ];
            })

            .addCase(editBooking.fulfilled, (state, action) => {
                const index = state.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.status = 'fulfilled';
                    state.error = null;
                    state.data[index] = action.payload;
                }
            })

            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.data = state.data.filter(item => item._id !== action.payload);
            })
            
            .addMatcher(
                isAnyOf( getBookings.pending, getBooking.pending, newBooking.pending, editBooking.pending, deleteBooking.pending ),
                (state) => {
                    state.status = 'pending';
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf( getBookings.rejected, getBooking.rejected, newBooking.rejected, editBooking.rejected, deleteBooking.rejected ),
                (state, action) => {
                    state.status = 'rejected';
                    state.error = action.error?.message ?? "Unknown error occurred";
                }
            )
    },
});

export const selectBookings = (state: RootState) => state.bookings;
export const selectBooking = (state: RootState) => state.bookings.item;
export const availableRooms = createSelector(
    (state: RootState) => state.rooms.data,
    (rooms) => {
        return rooms.filter(room => room.status === "Available").sort((a, b) => a.room_number - b.room_number);
    }
);

export default bookingsSlice.reducer;