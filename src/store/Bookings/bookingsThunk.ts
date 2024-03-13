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
    console.log("peticion: getBooking");
    
    try {
        await delay();

        return bookingsData.find((item) => item.id === id );
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const newBooking = createAsyncThunk('bookings/newBooking', async (newData: BookingData) => {
    console.log("peticion: newBooking");

    try {
        await delay();
        
        return newData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const editBooking = createAsyncThunk('bookings/editBooking', async ({id, newData}: {id: number, newData: BookingData} ) => {
    console.log("peticion: editBooking");
    console.log(newData);
    
    try {
        await delay();

        console.log(id);
        
        // const index = bookingsData.findIndex((item) => item.id === id);

        // if (index !== -1) {
        //     const edited = { ...bookingsData[index], ...newData };

        //     return edited;
        // } else {
        //     throw new Error(`Booking with ID ${id} not found`);
        // }

        return newData;

    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async ({id}: BookingData) => {
    console.log("peticion: deleteBooking");
    try {
        await delay();

        return id;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})