import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getBookingsThunk } from './bookingsThunk';
import { Data } from '../../components/Table/Table';

interface BookingData extends Data{
    id: number;
    full_name: string;
    order_date: string;
    check_in: string;
    check_out: string;
    special_request: string;
    number: number;
    price: number;
    type: string;
    status: string;
    amenities: string[];
    room_status: string;
    foto: string;
    description: string;
}

interface BookingsState {
    data: BookingData[];
    loading: boolean;
    status: string;
    error: string | null;
}

const initialState: BookingsState = {
    data: [],
    loading: false,
    status: "not_ready",
    error: null,
};

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBookingsThunk.pending, (bookings) => {
                bookings.loading = true;
                bookings.status = 'pending';
                bookings.error = null;
            })
            .addCase(getBookingsThunk.fulfilled, (bookings, action) => {
                bookings.loading = false;
                bookings.status = 'fulfilled';
                bookings.data = action.payload;
            })
            .addCase(getBookingsThunk.rejected, (bookings, action) => {
                bookings.loading = false;
                bookings.status = 'rejected';
                bookings.error = action.error?.message ?? "Unknown error occurred";
            });
    },
});

export const selectBookings = (state: RootState) => state.bookings;

export default bookingsSlice.reducer;