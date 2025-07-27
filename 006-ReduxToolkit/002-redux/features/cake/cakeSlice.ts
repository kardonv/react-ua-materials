import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    numOfCakes: 10,
}

const cakeSlice = createSlice({
    name: 'cake',
    initialState,
    reducers: {
        buyCake: (state) => {
            // We don't need to return the state
            state.numOfCakes--;
        },
        restoreCake: (state, action) => {
            state.numOfCakes += action.payload;
        }
    }
});

// console.log(cakeSlice);

export default cakeSlice.reducer;
export const cakeActions = cakeSlice.actions;