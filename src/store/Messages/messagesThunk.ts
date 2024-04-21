import { createAsyncThunk } from '@reduxjs/toolkit';
import { messagesCollection } from '../../helpers/API/apiVariables';
import { MessageData } from '../interfaces';
import { fetchFromApi } from '../../helpers/API/fetchFromApi';
import { customToast } from '../../helpers/toastify/customToast';

export const getMessagesThunk = createAsyncThunk('messages/fetchMessages', async () => {
    try {
        const data = await fetchFromApi("GET", messagesCollection);
        return data?.data;
    } catch (error) {
        customToast('error', 'Error fetching data', {position: "bottom-right"});
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
        const { updatedAt, __v, ...itemToFetch } = row;
        const itemToUpdate = {
            ...itemToFetch,
            [fieldToEdit]: !row[fieldToEdit]
        }
        await fetchFromApi("PUT", `${messagesCollection}/${row._id}`, itemToUpdate);

        return itemToUpdate;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})