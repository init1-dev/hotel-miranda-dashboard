import { createAsyncThunk } from '@reduxjs/toolkit';
import bookingsData from '../../Data/bookings.json';
import { BookingData } from '../interfaces';
import { delay } from '../../helpers/delay';

export const getBookings = createAsyncThunk('bookings/fetchBookings', async () => {
    try {
        await delay();

        return bookingsData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const getBooking = createAsyncThunk('bookings/fetchBooking', async (id: number) => {    
    try {
        await delay();

        return bookingsData.find((item) => item.id === id );
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const newBooking = createAsyncThunk('bookings/newBooking', async (newData: BookingData) => {    
    try {
        await delay();
        
        return newData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const editBooking = createAsyncThunk('bookings/editBooking', async ({id, newData}: {id: number, newData: BookingData} ) => {
    
    try {
        await delay();

        const index = bookingsData.findIndex((item) => item.id === id);

        if (index !== -1) {
            bookingsData[index] = { ...bookingsData[index], ...newData };

            return bookingsData;
        } else {
            throw new Error(`Booking with ID ${id} not found`);
        }

    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async ({id}: BookingData) => {
    try {
        await delay();

        return id;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})