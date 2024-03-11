import { createAsyncThunk } from '@reduxjs/toolkit';
import bookingsData from '../../Data/bookings.json';
import { BookingData } from '../interfaces';

export const getBookings = createAsyncThunk('bookings/fetchBookings', async () => {
    try {
        await new Promise((r) => setTimeout(r, 1000));

        return bookingsData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const getBooking = createAsyncThunk('bookings/fetchBooking', async (id: number) => {
    console.log(id);
    
    try {
        await new Promise((r) => setTimeout(r, 1000));

        return bookingsData[id];
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const newBooking = createAsyncThunk('bookings/newBooking', async (data: BookingData) => {
    console.log(data);
    
    try {
        await new Promise((r) => setTimeout(r, 1000));
        bookingsData.push(data);
        return bookingsData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const editBooking = createAsyncThunk('bookings/editBooking', async ({id, newData}: {id: number, newData: BookingData} ) => {
    
    try {
        await new Promise((r) => setTimeout(r, 1000));

        const index = bookingsData.findIndex((item) => item.id === id);

        if (index !== -1) {
            bookingsData[index] = { ...bookingsData[index], ...newData };
            
            return bookingsData;
        } else {
            // Si no se encontró el elemento, lanza un error
            throw new Error(`Booking with ID ${id} not found`);
        }

    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async ({id}: BookingData) => {
    try {
        await new Promise((r) => setTimeout(r, 1000));

        return bookingsData.filter(item => item.id !== id);
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})