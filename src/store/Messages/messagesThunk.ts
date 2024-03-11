import { createAsyncThunk } from '@reduxjs/toolkit';
import messagesData from '../../Data/messages.json';

export const getMessagesThunk = createAsyncThunk('messages/fetchMessages', async () => {
    try {
        await new Promise((r) => setTimeout(r, 1000));

        return messagesData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})
