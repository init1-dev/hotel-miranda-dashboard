import { createAsyncThunk } from '@reduxjs/toolkit';
import messagesData from '../../Data/messages.json';
import { delay } from '../../helpers/delay';
import { MessageData } from '../interfaces';

export const getMessagesThunk = createAsyncThunk('messages/fetchMessages', async () => {
    try {
        await delay();

        return messagesData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const archiveMsg = createAsyncThunk('messages/archive', async (row: MessageData) => {
    try {
        await delay();

        const updatedRow: MessageData = {
            ...row,
            archived: !row.archived
        }

        return updatedRow;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})