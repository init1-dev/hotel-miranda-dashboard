import { createAsyncThunk } from '@reduxjs/toolkit';
import employeesData from '../../Data/employees.json';
import { delay } from '../../helpers/delay';
import { EmployeeData } from '../interfaces';
import { fetchFromApi } from '../../helpers/API/fetchFromApi';
import { employeesCollection, token } from '../../helpers/API/apiVariables';

export const getEmployeesThunk = createAsyncThunk('employees/fetchEmployees', async () => {
    try {
        const data = await fetchFromApi("GET", employeesCollection, token);
        return data?.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const getEmployee = createAsyncThunk('employees/fetchEmployee', async (id: string) => {    
    try {
        const data = await fetchFromApi("GET", `${employeesCollection}/${id}`, token);
        return data?.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const getEmployeeAuth = createAsyncThunk('employees/fetchEmployee', async (employee_id: string | null) => {
    try {
        await delay();

        return employeesData.find((item) => item.employee_id === employee_id );
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const newEmployee = createAsyncThunk('employees/newEmployee', async (newData: EmployeeData) => {
    try {
        const { _id, ...itemToFetch } = newData;
        const newEmployee = await fetchFromApi("POST", `${employeesCollection}`, token, itemToFetch);
        
        return newEmployee?.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const editEmployee = createAsyncThunk('employees/editEmployee', async ({id, newData}: {id: string, newData: EmployeeData} ) => {
    try {
        const { createdAt, updatedAt, __v, ...itemToFetch } = newData;
        await fetchFromApi("PUT", `${employeesCollection}/${id}`, token, itemToFetch);
        
        return itemToFetch;

    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async ({_id}: EmployeeData) => {
    try {
        await fetchFromApi("DELETE", `${employeesCollection}/${_id}`, token);

        return _id;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})