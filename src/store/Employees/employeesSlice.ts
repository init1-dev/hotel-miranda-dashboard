import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { deleteEmployee, editEmployee, getEmployee, getEmployeesThunk, newEmployee } from './employeesThunk';
import { EmployeesState } from '../interfaces';

const DEFAULT_STATE: EmployeesState = {
    data: [],
    item: {
        itemData: undefined,
        status: 'idle',
        error: null
    },
    loading: false,
    status: "idle",
    error: null,
};

// const initialState: EmployeesState = (() => {
//     const persistedState = localStorage.getItem("__hotel__app__state__");
//     return (persistedState) ? JSON.parse(persistedState).employees : DEFAULT_STATE;
// })();

const employeesSlice = createSlice({
    name: 'employees',
    initialState: DEFAULT_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmployeesThunk.pending, (state) => {
                state.loading = true;
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getEmployeesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'fulfilled';
                state.error = null;
                state.data = action.payload;
            })
            .addCase(getEmployeesThunk.rejected, (state, action) => {
                state.loading = false;
                state.status = 'rejected';
                state.error = action.error?.message ?? "Unknown error occurred";
            })

            .addCase(getEmployee.pending, (state) => {
                state.item.status = 'pending';
                state.item.error = null;
            })
            .addCase(getEmployee.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.item.itemData = action.payload;
            })
            .addCase(getEmployee.rejected, (state, action) => {
                state.item.status = 'rejected';
                state.item.error = action.error?.message ?? "Unknown error occurred";
            })

            .addCase(newEmployee.pending, (state) => {
                state.item.status = 'pending';
                state.item.error = null;
            })
            .addCase(newEmployee.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.data = [
                    ...state.data,
                    action.payload 
                ];
            })
            .addCase(newEmployee.rejected, (state, action) => {
                state.item.status = 'rejected';
                state.item.error = action.error?.message ?? "Unknown error occurred";
            })

            .addCase(editEmployee.pending, (state) => {
                state.item.status = 'pending';
                state.item.error = null;
            })
            .addCase(editEmployee.fulfilled, (state, action) => {
                const index = state.data.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.status = 'fulfilled';
                    state.error = null;
                    state.data[index] = action.payload;
                }
            })
            .addCase(editEmployee.rejected, (state, action) => {
                state.item.status = 'rejected';
                state.item.error = action.error?.message ?? "Unknown error occurred";
            })

            .addCase(deleteEmployee.pending, (state) => {
                state.item.status = 'pending';
                state.item.error = null;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.data = state.data.filter(item => item.id !== action.payload);
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.item.status = 'rejected';
                state.item.error = action.error?.message ?? "Unknown error occurred";
            })
    },
});

export const selectEmployees = (state: RootState) => state.employees;
export const selecEmployee = (state: RootState) => state.employees.item;

export default employeesSlice.reducer;