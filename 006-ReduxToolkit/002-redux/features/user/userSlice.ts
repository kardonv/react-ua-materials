import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
    loading: false,
    users: [],
    error: '',
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data.map((user: any) => user.id);
});

// console.log(fetchUsers);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            console.log('Rejected', action);
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;