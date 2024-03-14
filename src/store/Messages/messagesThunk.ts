import { createAsyncThunk } from '@reduxjs/toolkit';
import messagesData from '../../Data/messages.json';
import { delay } from '../../helpers/delay';

export const getMessagesThunk = createAsyncThunk('messages/fetchMessages', async () => {
    try {
        await delay();

        return messagesData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

// GET ONE

// EDIT ONE

// DELETE ONE