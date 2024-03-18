import { createAsyncThunk } from '@reduxjs/toolkit';
import roomsData from '../../Data/rooms.json';
import { RoomData } from '../interfaces';
import { delay } from '../../helpers/delay';

export const getRoomsThunk = createAsyncThunk('rooms/fetchRooms', async () => {
    try {
        await delay();

        return roomsData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const getRoom = createAsyncThunk('rooms/fetchRoom', async (id: number) => {    
    try {
        await delay();

        return roomsData.find((item) => item.id === id );
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const newRoom = createAsyncThunk('rooms/newRoom', async (newData: RoomData) => {
    try {
        await delay();
        
        return newData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const editRoom = createAsyncThunk('rooms/editRoom', async ({id, newData}: {id: number, newData: RoomData} ) => {    
    try {
        await delay();

        console.log(id);

        return newData;

    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async ({id}: RoomData) => {
    try {
        await delay();

        return id;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})