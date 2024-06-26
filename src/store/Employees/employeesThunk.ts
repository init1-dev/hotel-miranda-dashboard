import { createAsyncThunk } from '@reduxjs/toolkit';
import { employeesCollection } from '../../helpers/API/apiVariables';
import { EmployeeData } from '../interfaces';
import { fetchFromApi } from '../../helpers/API/fetchFromApi';
import { customToast } from '../../helpers/toastify/customToast';

export const getEmployeesThunk = createAsyncThunk('employees/fetchEmployees', async () => {
    try {
        const data = await fetchFromApi("GET", employeesCollection);
        return data?.data;
    } catch (error) {
        customToast('error', 'Error fetching data', {position: "bottom-right"});
        throw new Error(`Error: ${error}`);
    }
})

export const getEmployee = createAsyncThunk('employees/fetchEmployee', async (id: string) => {    
    try {
        const data = await fetchFromApi("GET", `${employeesCollection}/${id}`);
        return data?.data;
    } catch (error) {
        customToast('error', 'Error fetching data');
        throw new Error(`Error: ${error}`);
    }
})

export const newEmployee = createAsyncThunk('employees/newEmployee', async (newData: EmployeeData) => {
    try {
        const { _id, ...itemToFetch } = newData;
        const newEmployee = await fetchFromApi("POST", `${employeesCollection}`, itemToFetch);
        return newEmployee?.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const editEmployee = createAsyncThunk('employees/editEmployee', async ({id, newData}: {id: string, newData: any} ) => {
    try {
        const { createdAt, updatedAt, __v, ...itemToFetch } = newData;
        await fetchFromApi("PUT", `${employeesCollection}/${id}`, itemToFetch);
        return itemToFetch;

    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (_id: string) => {
    try {
        await fetchFromApi("DELETE", `${employeesCollection}/${_id}`);

        return _id;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})