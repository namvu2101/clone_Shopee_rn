import {createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  data: [],
  loading:false,
  loadingproduct: false,
  error: null,
};
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getDataRequest: state => {
      state.loading = true;
    },
    getDataSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload;
      state.error = null;
      state.loadingproduct = true;

    },
    getDataFailure: (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
      state.loadingproduct = false;

    },
  },
});

export const {getDataRequest, getDataSuccess, getDataFailure} =
  productSlice.actions;

export const getProduct = () => async dispatch => {
  try {
    dispatch(getDataRequest());
    const querySnapshot = await firestore().collection('product').get();
    const res = querySnapshot.docs.map(doc => doc.data());
    dispatch(getDataSuccess(res));
  } catch (error) {
    
    dispatch(getDataFailure(error.message));
  }
};

export default productSlice.reducer;
