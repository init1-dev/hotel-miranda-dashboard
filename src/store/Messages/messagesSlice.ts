import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { archiveMsg, getMessagesThunk } from './messagesThunk';
import { MessagesState } from '../interfaces';

const DEFAULT_STATE: MessagesState = {
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

// const initialState: MessagesState = (() => {
//     const persistedState = localStorage.getItem("__hotel__app__state__");
//     return (persistedState) ? JSON.parse(persistedState).messages : DEFAULT_STATE;
// })();

const messagesSlice = createSlice({
    name: 'messages',
    initialState: DEFAULT_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMessagesThunk.pending, (state) => {
                state.loading = true;
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getMessagesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'fulfilled';
                state.error = null;
                state.data = action.payload;
            })
            .addCase(getMessagesThunk.rejected, (state, action) => {
                state.loading = false;
                state.status = 'rejected';
                state.error = action.error?.message ?? "Unknown error occurred";
            })

            .addCase(archiveMsg.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(archiveMsg.fulfilled, (state, action) => {
                const index = state.data.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.status = 'fulfilled';
                    state.error = null;
                    state.data[index] = action.payload;
                }
            })
            .addCase(archiveMsg.rejected, (state, action) => {
                state.loading = false;
                state.status = 'rejected';
                state.error = action.error?.message ?? "Unknown error occurred";
            });
    },
});

export const selectMessages = (state: RootState) => state.messages;

export default messagesSlice.reducer;