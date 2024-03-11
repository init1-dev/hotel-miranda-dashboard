import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getEmployeesThunk } from './employeesThunk';
import { Data } from '../../components/Table/Table';

interface EmployeeData extends Data{
    id: number;
    photo: string;
    name: string;
    lastname: string;
    fullname: string;
    employee_id: string;
    email: string;
    start_date: string;
    description: string;
    phone: string;
    status: boolean;
}

interface EmployeesState {
    data: EmployeeData[];
    loading: boolean;
    status: string;
    error: string | null;
}

const DEFAULT_STATE: EmployeesState = {
    data: [],
    loading: false,
    status: "not_ready",
    error: null,
};

const initialState: EmployeesState = (() => {
    const persistedState = localStorage.getItem("__hotel__app__state__");
    return (persistedState) ? JSON.parse(persistedState).employees : DEFAULT_STATE;
})();

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmployeesThunk.pending, (employees) => {
                employees.loading = true;
                employees.status = 'pending';
                employees.error = null;
            })
            .addCase(getEmployeesThunk.fulfilled, (employees, action) => {
                employees.loading = false;
                employees.status = 'fulfilled';
                employees.data = action.payload;
            })
            .addCase(getEmployeesThunk.rejected, (employees, action) => {
                employees.loading = false;
                employees.status = 'rejected';
                employees.error = action.error?.message ?? "Unknown error occurred";
            });
    },
});

export const selectEmployees = (state: RootState) => state.employees;

export default employeesSlice.reducer;