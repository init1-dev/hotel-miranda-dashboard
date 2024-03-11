import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getMessagesThunk } from './messagesThunk';
import { MessagesState } from '../interfaces';

const DEFAULT_STATE: MessagesState = {
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

const initialState: MessagesState = (() => {
    const persistedState = localStorage.getItem("__hotel__app__state__");
    return (persistedState) ? JSON.parse(persistedState).messages : DEFAULT_STATE;
})();

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