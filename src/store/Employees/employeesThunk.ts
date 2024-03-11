import { createAsyncThunk } from '@reduxjs/toolkit';
import employeesData from '../../Data/employees.json';

export const getEmployeesThunk = createAsyncThunk('employees/fetchEmployees', async () => {
    try {
        await new Promise((r) => setTimeout(r, 1000));

        return employeesData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
})
