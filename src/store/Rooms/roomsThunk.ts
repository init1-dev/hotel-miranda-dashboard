import { createAsyncThunk } from '@reduxjs/toolkit';
import { roomsCollection } from '../../helpers/API/apiVariables';
import { RoomData } from '../interfaces';
import { fetchFromApi } from '../../helpers/API/fetchFromApi';
import { getTokenFromLocalStorage } from '../../helpers/localStorage/getTokenFromLocalStorage';
import roomsData from '../../Data/rooms.json';

export const getRoomsThunk = createAsyncThunk('rooms/fetchRooms', async () => {
    try {
        const token = getTokenFromLocalStorage();
        const data = await fetchFromApi("GET", roomsCollection, token);
        return data?.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const getRoom = createAsyncThunk('rooms/fetchRoom', async (id: number) => {    
    try {

        return roomsData.find((item) => item.id === id );
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const newRoom = createAsyncThunk('rooms/newRoom', async (newData: RoomData) => {
    try {
        
        return newData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const editRoom = createAsyncThunk('rooms/editRoom', async ({id, newData}: {id: number, newData: RoomData} ) => {    
    try {

        console.log(id);

        return newData;

    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async ({id}: RoomData) => {
    try {

        return id;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})