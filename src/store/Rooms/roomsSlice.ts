import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getRoomsThunk } from './roomsThunk';
import { Data } from '../../components/Table/Table';

interface RoomData extends Data{
    id: number;
    name: string;
    photo: string;
    room_type: string;
    room_number: number;
    description: string;
    offer: number;
    price: number;
    cancellation: boolean;
    amenities: string[];
    discount: number;
    status: string;
}

interface RoomState {
    data: RoomData[];
    loading: boolean;
    status: string;
    error: string | null;
}

const DEFAULT_STATE: RoomState = {
    data: [],
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