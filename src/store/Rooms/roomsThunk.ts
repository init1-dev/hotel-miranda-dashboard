import { createAsyncThunk } from '@reduxjs/toolkit';
import { roomsCollection } from '../../helpers/API/apiVariables';
import { RoomData } from '../interfaces';
import { fetchFromApi } from '../../helpers/API/fetchFromApi';
import { customToast } from '../../helpers/toastify/customToast';

export const getRoomsThunk = createAsyncThunk('rooms/fetchRooms', async () => {
    try {
        const data = await fetchFromApi("GET", roomsCollection);
        return data?.data;
    } catch (error) {
        customToast('error', 'Error fetching data', {position: "bottom-right"});
        throw new Error(`Error: ${error}`);
    }
})

export const getRoom = createAsyncThunk('rooms/fetchRoom', async (id: string) => {    
    try {
        const data = await fetchFromApi("GET", `${roomsCollection}/${id}`);
        return data?.data;
    } catch (error) {
        customToast('error', 'Error fetching data');
        throw new Error(`Error: ${error}`);
    }
})

export const newRoom = createAsyncThunk('rooms/newRoom', async (newData: RoomData) => {
    try {
        const { _id, ...itemToFetch } = newData;
        const newRoom = await fetchFromApi("POST", `${roomsCollection}`, itemToFetch);
        return newRoom?.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const editRoom = createAsyncThunk('rooms/editRoom', async ({id, newData}: {id: string, newData: RoomData} ) => {    
    try {
        const { createdAt, updatedAt, __v, ...itemToFetch } = newData;
        await fetchFromApi("PUT", `${roomsCollection}/${id}`, itemToFetch);
        return itemToFetch;

    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (_id: string) => {
    try {
        await fetchFromApi("DELETE", `${roomsCollection}/${_id}`);

        return _id;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})