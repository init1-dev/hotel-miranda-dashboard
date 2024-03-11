import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getRoomsThunk } from './roomsThunk';
import { RoomState } from '../interfaces';

const DEFAULT_STATE: RoomState = {
    data: [],
    item: {
        itemData: null,
        status: 'idle',
        error: null
    },
    loading: false,
    status: "not_ready",
    error: null,
};

const initialState: RoomState = (() => {
    const persistedState = localStorage.getItem("__hotel__app__state__");
    return (persistedState) ? JSON.parse(persistedState).rooms : DEFAULT_STATE;
})();

const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRoomsThunk.pending, (rooms) => {
                rooms.loading = true;
                rooms.status = 'pending';
                rooms.error = null;
            })
            .addCase(getRoomsThunk.fulfilled, (rooms, action) => {
                rooms.loading = false;
                rooms.status = 'fulfilled';
                rooms.data = action.payload;
            })
            .addCase(getRoomsThunk.rejected, (rooms, action) => {
                rooms.loading = false;
                rooms.status = 'rejected';
                rooms.error = action.error?.message ?? "Unknown error occurred";
            });
    },
});

export const selectRooms = (state: RootState) => state.rooms;

export default roomSlice.reducer;