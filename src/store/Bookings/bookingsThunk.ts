import { createAsyncThunk } from '@reduxjs/toolkit';
import { bookingsCollection } from '../../helpers/API/apiVariables';
import { BookingData } from '../interfaces';
import { fetchFromApi } from '../../helpers/API/fetchFromApi';
import { customToast } from '../../helpers/toastify/customToast';

export const getBookings = createAsyncThunk('bookings/fetchBookings', async () => {
    try {
        const data = await fetchFromApi("GET", bookingsCollection);
        return data?.data;
    } catch (error) {
        customToast('error', 'Error fetching data', {position: "bottom-right"});
        throw new Error(`Error: ${error}`);
    }
})

export const getBooking = createAsyncThunk('bookings/fetchBooking', async (id: string) => {    
    try {
        const data = await fetchFromApi("GET", `${bookingsCollection}/${id}`);
        return data?.data;
    } catch (error) {
        customToast('error', 'Error fetching data');
        throw new Error(`Error: ${error}`);
    }
})

export const newBooking = createAsyncThunk('bookings/newBooking', async (newData: BookingData) => {
    try {
        const { _id, ...itemToFetch } = newData;
        const newEmployee = await fetchFromApi("POST", `${bookingsCollection}`, itemToFetch);
        
        return newEmployee?.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const editBooking = createAsyncThunk('bookings/editBooking', async ({id, newData}: {id: string, newData: BookingData} ) => {
    try {
        const { createdAt, updatedAt, __v, ...itemToFetch } = newData;
        await fetchFromApi("PUT", `${bookingsCollection}/${id}`, itemToFetch);
        
        return itemToFetch;

    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async ({_id}: BookingData) => {
    try {
        await fetchFromApi("DELETE", `${bookingsCollection}/${_id}`);

        return _id;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})