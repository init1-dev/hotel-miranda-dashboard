import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { deleteRoom, editRoom, getRoom, getRoomsThunk, newRoom } from './roomsThunk';
import { RoomState } from '../interfaces';

const DEFAULT_STATE: RoomState = {
    data: [],
    item: {
        itemData: undefined,
        status: 'idle',
        error: null
    },
    loading: false,
    status: "idle",
    error: null,
};

// const initialState: RoomState = (() => {
//     const persistedState = localStorage.getItem("__hotel__app__state__");
//     return (persistedState) ? JSON.parse(persistedState).rooms : DEFAULT_STATE;
// })();

const roomSlice = createSlice({
    name: 'rooms',
    initialState: DEFAULT_STATE,
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
                rooms.error = null;
                rooms.data = action.payload;
            })
            .addCase(getRoomsThunk.rejected, (rooms, action) => {
                rooms.loading = false;
                rooms.status = 'rejected';
                rooms.error = action.error?.message ?? "Unknown error occurred";
            })

            .addCase(getRoom.pending, (state) => {
                state.item.status = 'pending';
                state.item.error = null;
            })
            .addCase(getRoom.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.item.itemData = action.payload;
            })
            .addCase(getRoom.rejected, (state, action) => {
                state.item.status = 'rejected';
                state.item.error = action.error?.message ?? "Unknown error occurred";
            })

            .addCase(newRoom.pending, (state) => {
                state.item.status = 'pending';
                state.item.error = null;
            })
            .addCase(newRoom.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.data = [
                    ...state.data,
                    action.payload 
                ];
            })
            .addCase(newRoom.rejected, (state, action) => {
                state.item.status = 'rejected';
                state.item.error = action.error?.message ?? "Unknown error occurred";
            })

            .addCase(editRoom.pending, (state) => {
                state.item.status = 'pending';
                state.item.error = null;
            })
            .addCase(editRoom.fulfilled, (state, action) => {
                const index = state.data.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.status = 'fulfilled';
                    state.error = null;
                    state.data[index] = action.payload;
                }
            })
            .addCase(editRoom.rejected, (state, action) => {
                state.item.status = 'rejected';
                state.item.error = action.error?.message ?? "Unknown error occurred";
            })

            .addCase(deleteRoom.pending, (state) => {
                state.item.status = 'pending';
                state.item.error = null;
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.data = state.data.filter(item => item.id !== action.payload);
            })
            .addCase(deleteRoom.rejected, (state, action) => {
                state.item.status = 'rejected';
                state.item.error = action.error?.message ?? "Unknown error occurred";
            })
    },
});

export const selectRooms = (state: RootState) => state.rooms;

export default roomSlice.reducer;