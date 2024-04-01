import { createSlice, isAnyOf } from '@reduxjs/toolkit';
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

const employeesSlice = createSlice({
    name: 'employees',
    initialState: DEFAULT_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmployeesThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.data = action.payload;
            })

            .addCase(getEmployee.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.item.itemData = action.payload;
            })

            .addCase(newEmployee.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.data = [
                    ...state.data,
                    action.payload 
                ];
            })

            .addCase(editEmployee.fulfilled, (state, action) => {
                const index = state.data.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.status = 'fulfilled';
                    state.error = null;
                    state.data[index] = action.payload;
                }
            })

            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.item.status = 'fulfilled';
                state.item.error = null;
                state.data = state.data.filter(item => item.id !== action.payload);
            })

            .addMatcher(
                isAnyOf( getEmployeesThunk.pending, getEmployee.pending, newEmployee.pending, editEmployee.pending, deleteEmployee.pending ),
                (state) => {
                    state.status = 'pending';
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf( getEmployeesThunk.rejected, getEmployee.rejected, newEmployee.rejected, editEmployee.rejected, deleteEmployee.rejected ),
                (state, action) => {
                    state.status = 'rejected';
                    state.error = action.error?.message ?? "Unknown error occurred";
                }
            )
    },
});

export const selectEmployees = (state: RootState) => state.employees;
export const selecEmployee = (state: RootState) => state.employees.item;

export default employeesSlice.reducer;