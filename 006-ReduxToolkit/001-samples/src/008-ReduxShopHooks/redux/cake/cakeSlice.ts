import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    numOfCakes: 10,
}

const cakeSlice = createSlice({
    name: 'cake',
    initialState,
    reducers: {
        buyCake: (state) => {
            state.numOfCakes--;
        }
    }
});

export default cakeSlice.reducer;
export const actions = cakeSlice.actions;