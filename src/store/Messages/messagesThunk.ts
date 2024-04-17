import { createAsyncThunk } from '@reduxjs/toolkit';
import { messagesCollection } from '../../helpers/API/apiVariables';
import { MessageData } from '../interfaces';
import { fetchFromApi } from '../../helpers/API/fetchFromApi';
import { getTokenFromLocalStorage } from '../../helpers/localStorage/getTokenFromLocalStorage';

export const getMessagesThunk = createAsyncThunk('messages/fetchMessages', async () => {
    try {
        const token = getTokenFromLocalStorage();
        const data = await fetchFromApi("GET", messagesCollection, token);
        return data?.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

interface EditMsgInterface {
    row: MessageData;
    fieldToEdit: string;
}

export const editMessage = createAsyncThunk('messages/edit', async ({
    row,
    fieldToEdit
}: EditMsgInterface) => {
    try {
        const token = getTokenFromLocalStorage();
        const { updatedAt, __v, ...itemToFetch } = row;
        const itemToUpdate = {
            ...itemToFetch,
            [fieldToEdit]: !row[fieldToEdit]
        }
        await fetchFromApi("PUT", `${messagesCollection}/${row._id}`, token, itemToUpdate);

        return itemToUpdate;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})