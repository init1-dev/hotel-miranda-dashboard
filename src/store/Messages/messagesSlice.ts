import { createSlice, isAnyOf } from '@reduxjs/toolkit';
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

const messagesSlice = createSlice({
    name: 'messages',
    initialState: DEFAULT_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMessagesThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.data = action.payload;
            })

            .addCase(archiveMsg.fulfilled, (state, action) => {
                const index = state.data.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.status = 'fulfilled';
                    state.error = null;
                    state.data[index] = action.payload;
                }
            })

            .addMatcher(
                isAnyOf( getMessagesThunk.pending, archiveMsg.pending ),
                (state) => {
                    state.status = 'pending';
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf( getMessagesThunk.rejected, archiveMsg.rejected ),
                (state, action) => {
                    state.status = 'rejected';
                    state.error = action.error?.message ?? "Unknown error occurred";
                }
            )
    },
});

export const selectMessages = (state: RootState) => state.messages;

export default messagesSlice.reducer;