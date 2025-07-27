import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    numOfIceCreams: 20,
};

const iceCreamSlice = createSlice({
    name: 'iceCream',
    initialState,
    reducers: {
        buyIceCream: (state) => {
            state.numOfIceCreams--;
        },
        restoreIceCream: (state, action) => {
            state.numOfIceCreams += action.payload;
        },
        // extraReducers: {
        //     ['cake/buyCake']: (state) => {
        //         state.numOfIceCreams--;
        //     },
        // } as any,
    }
});

export default iceCreamSlice.reducer;
export const iceCreamActions = iceCreamSlice.actions;