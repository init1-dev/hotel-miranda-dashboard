import { createAsyncThunk } from '@reduxjs/toolkit';
// import messagesData from '../../Data/messages.json';
import { delay } from '../../helpers/delay';
import { MessageData } from '../interfaces';
import { fetchFromApi } from '../../helpers/API/fetchFromApi';
import { messagesCollection, token } from '../../helpers/API/apiVariables';

export const getMessagesThunk = createAsyncThunk('messages/fetchMessages', async () => {
    try {
        const data = await fetchFromApi("GET", messagesCollection, token);
        return data?.data;
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