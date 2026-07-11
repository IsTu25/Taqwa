import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaqwaState {
  score: number;
}

const initialState: TaqwaState = {
  score: 0,
};

export const taqwaSlice = createSlice({
  name: 'taqwa',
  initialState,
  reducers: {
    addDeed: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    addSin: (state, action: PayloadAction<number>) => {
      state.score -= action.payload;
    },
    resetScore: (state) => {
      state.score = 0;
    },
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
  },
});

export const { addDeed, addSin, resetScore, setScore } = taqwaSlice.actions;

export default taqwaSlice.reducer;
