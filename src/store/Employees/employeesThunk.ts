import { createAsyncThunk } from '@reduxjs/toolkit';
import { employeesCollection } from '../../helpers/API/apiVariables';
import { EmployeeData } from '../interfaces';
import { fetchFromApi } from '../../helpers/API/fetchFromApi';
import { getTokenFromLocalStorage } from '../../helpers/localStorage/getTokenFromLocalStorage';
import { customToast } from '../../helpers/toastify/customToast';

export const getEmployeesThunk = createAsyncThunk('employees/fetchEmployees', async () => {
    try {
        const token = getTokenFromLocalStorage();
        const data = await fetchFromApi("GET", employeesCollection, token);
        if(data?.status === 200 && data?.data.length === 0){
            customToast('warn', 'Empty data', {position: "bottom-right"});
        }
        return data?.data;
    } catch (error) {
        customToast('error', 'Error fetching data', {position: "bottom-right"});
        throw new Error(`Error: ${error}`);
    }
})

export const getEmployee = createAsyncThunk('employees/fetchEmployee', async (id: string) => {    
    try {
        const token = getTokenFromLocalStorage();
        const data = await fetchFromApi("GET", `${employeesCollection}/${id}`, token);
        return data?.data;
    } catch (error) {
        customToast('error', 'Error fetching data');
        throw new Error(`Error: ${error}`);
    }
})

export const newEmployee = createAsyncThunk('employees/newEmployee', async (newData: EmployeeData) => {
    try {
        const token = getTokenFromLocalStorage();
        const { _id, ...itemToFetch } = newData;
        const newEmployee = await fetchFromApi("POST", `${employeesCollection}`, token, itemToFetch);
        return newEmployee?.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const editEmployee = createAsyncThunk('employees/editEmployee', async ({id, newData}: {id: string, newData: EmployeeData} ) => {
    try {
        const token = getTokenFromLocalStorage();
        const { createdAt, updatedAt, __v, ...itemToFetch } = newData;
        await fetchFromApi("PUT", `${employeesCollection}/${id}`, token, itemToFetch);
        return itemToFetch;

    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async ({_id}: EmployeeData) => {
    try {
        const token = getTokenFromLocalStorage();
        await fetchFromApi("DELETE", `${employeesCollection}/${_id}`, token);

        return _id;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})