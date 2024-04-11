import { createAsyncThunk } from '@reduxjs/toolkit';
import employeesData from '../../Data/employees.json';
import { delay } from '../../helpers/delay';
import { EmployeeData } from '../interfaces';
import { fetchFromApi } from '../../helpers/API/fetchFromApi';

export const getEmployeesThunk = createAsyncThunk('employees/fetchEmployees', async () => {
    try {
        const token: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImluaXQxLmRldiIsImlhdCI6MTcxMjMzNzAxNiwiZXhwIjozMTcyODgzMzcwMTZ9.ixi3vyOZck7xenveXI27P-MEtgQlbdaRSJv4Gqsbmzw";
        const data = await fetchFromApi("GET", "employees", token);
        
        return data?.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const getEmployee = createAsyncThunk('employees/fetchEmployee', async (id: number) => {    
    try {
        await delay();

        return employeesData.find((item) => item.id === id );
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
        await delay();
        
        return newData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const editEmployee = createAsyncThunk('employees/editEmployee', async ({id, newData}: {id: number, newData: EmployeeData} ) => {
    try {
        await delay();

        console.log(id);
        
        return newData;

    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async ({id}: EmployeeData) => {
    try {
        await delay();

        return id;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})