import { createAsyncThunk } from '@reduxjs/toolkit';
import roomsData from '../../Data/rooms.json';

export const getRoomsThunk = createAsyncThunk('rooms/fetchRooms', async () => {
    try {
        await new Promise((r) => setTimeout(r, 1000));

        return roomsData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})
