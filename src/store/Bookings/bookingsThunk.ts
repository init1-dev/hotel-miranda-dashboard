import { createAsyncThunk } from '@reduxjs/toolkit';
import { bookingsCollection } from '../../helpers/API/apiVariables';
import { BookingData } from '../interfaces';
import { fetchFromApi } from '../../helpers/API/fetchFromApi';
import { getTokenFromLocalStorage } from '../../helpers/localStorage/getTokenFromLocalStorage';
import { customToast } from '../../helpers/toastify/customToast';

export const getBookings = createAsyncThunk('bookings/fetchBookings', async () => {
    try {
        const token = getTokenFromLocalStorage();
        const data = await fetchFromApi("GET", bookingsCollection, token);
        if(data?.status === 200 && data?.data.length === 0){
            customToast('warn', 'Empty data');
        }
        return data?.data;
    } catch (error) {
        customToast('error', 'Error fetching data');
        throw new Error(`Error: ${error}`);
    }
})

export const getBooking = createAsyncThunk('bookings/fetchBooking', async (id: string) => {    
    try {
        const token = getTokenFromLocalStorage();
        const data = await fetchFromApi("GET", `${bookingsCollection}/${id}`, token);
        return data?.data;
    } catch (error) {
        customToast('error', 'Error fetching data');
        throw new Error(`Error: ${error}`);
    }
})

export const newBooking = createAsyncThunk('bookings/newBooking', async (newData: BookingData) => {
    try {
        const token = getTokenFromLocalStorage();
        const { _id, ...itemToFetch } = newData;
        const newEmployee = await fetchFromApi("POST", `${bookingsCollection}`, token, itemToFetch);
        
        return newEmployee?.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const editBooking = createAsyncThunk('bookings/editBooking', async ({id, newData}: {id: string, newData: BookingData} ) => {
    try {
        const token = getTokenFromLocalStorage();
        const { createdAt, updatedAt, __v, ...itemToFetch } = newData;
        await fetchFromApi("PUT", `${bookingsCollection}/${id}`, token, itemToFetch);
        
        return itemToFetch;

    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async ({_id}: BookingData) => {
    try {
        const token = getTokenFromLocalStorage();
        await fetchFromApi("DELETE", `${bookingsCollection}/${_id}`, token);

        return _id;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})