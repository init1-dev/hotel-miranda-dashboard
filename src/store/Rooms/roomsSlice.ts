import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { deleteRoom, editRoom, getRoom, getRoomsThunk, newRoom } from './roomsThunk';
import { RoomData, RoomState } from '../interfaces';

const DEFAULT_STATE: RoomState = {
    data: [],
    item: {
        itemData: undefined,
        status: 'idle',
        error: null
    },
    availableRooms: [],
    loading: false,
    status: "idle",
    error: null,
};

const roomSlice = createSlice({
    name: 'rooms',
    initialState: DEFAULT_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRoomsThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.data = action.payload;
                state.availableRooms = action.payload.filter((room: RoomData) => room.status === 'Available');
            })

            .addCase(getRoom.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.item.itemData = action.payload;
            })

            .addCase(newRoom.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.data = [
                    ...state.data,
                    action.payload 
                ];
            })

            .addCase(editRoom.fulfilled, (state, action) => {
                const index = state.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.status = 'fulfilled';
                    state.error = null;
                    state.data[index] = action.payload;
                }
            })

            .addCase(deleteRoom.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.data = state.data.filter(item => item._id !== action.payload);
            })

            .addMatcher(
                isAnyOf( getRoomsThunk.pending, getRoom.pending, newRoom.pending, editRoom.pending, deleteRoom.pending ),
                (state) => {
                    state.status = 'pending';
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf( getRoomsThunk.rejected, getRoom.rejected, newRoom.rejected, editRoom.rejected, deleteRoom.rejected ),
                (state, action) => {
                    state.status = 'rejected';
                    state.error = action.error?.message ?? "Unknown error occurred";
                }
            )
    },
});

export const selectRooms = (state: RootState) => state.rooms;
export const selectRoom = (state: RootState) => state.rooms.item;

export default roomSlice.reducer;