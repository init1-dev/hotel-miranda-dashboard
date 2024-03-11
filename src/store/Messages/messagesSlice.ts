import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getMessagesThunk } from './messagesThunk';
import { Data } from '../../components/Table/Table';

interface MessageData extends Data{
    id: number;
    message_id: string;
    full_name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    stars: number;
    date: string;
    read: boolean;
    archived: boolean;
    foto: string;
    time_passed: string;
}

interface MessagesState {
    data: MessageData[];
    loading: boolean;
    status: string;
    error: string | null;
}

const initialState: MessagesState = {
    data: [],
    loading: false,
    status: "not_ready",
    error: null,
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMessagesThunk.pending, (messages) => {
                messages.loading = true;
                messages.status = 'pending';
                messages.error = null;
            })
            .addCase(getMessagesThunk.fulfilled, (messages, action) => {
                messages.loading = false;
                messages.status = 'fulfilled';
                messages.data = action.payload;
            })
            .addCase(getMessagesThunk.rejected, (messages, action) => {
                messages.loading = false;
                messages.status = 'rejected';
                messages.error = action.error?.message ?? "Unknown error occurred";
            });
    },
});

export const selectMessages = (state: RootState) => state.messages;

export default messagesSlice.reducer;