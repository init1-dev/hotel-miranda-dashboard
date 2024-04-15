import { createAsyncThunk } from '@reduxjs/toolkit';
import { messagesCollection } from '../../helpers/API/apiVariables';
import { MessageData } from '../interfaces';
import { fetchFromApi } from '../../helpers/API/fetchFromApi';
import { getTokenFromLocalStorage } from '../../helpers/localStorage/getTokenFromLocalStorage';

const token = getTokenFromLocalStorage();

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
        const updatedRow: MessageData = {
            ...row,
            archived: !row.archived
        }

        return updatedRow;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})