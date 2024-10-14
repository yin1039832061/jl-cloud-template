import { createSlice } from '@reduxjs/toolkit';
import { ICommonState } from './type';

const initialState: ICommonState = {
  value: 0,
    authMap:{}
}
export const counterSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;