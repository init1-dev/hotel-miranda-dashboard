import { createAsyncThunk } from '@reduxjs/toolkit';
import bookingsData from '../../Data/bookings.json';

export const getBookingsThunk = createAsyncThunk('bookings/fetchBookings', async () => {
    try {
        await new Promise((r) => setTimeout(r, 1000));

        return bookingsData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})
