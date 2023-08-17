import { createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  user: [],
  loading: false,
  error: null,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserRequest: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    getUserFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { getUserRequest, getUserSuccess, getUserFailure } = userSlice.actions;

export const getUser = (email) => async (dispatch) => {
  try {
    dispatch(getUserRequest());
    const querySnapshot = await firestore().collection('user').where('email','==',email).get();
    const res = querySnapshot.docs.map(doc => doc.data());
      dispatch(getUserSuccess(res));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

export default userSlice.reducer;
