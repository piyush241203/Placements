import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance"; // Import the axiosInstance
import Cookies from 'js-cookie'; // Import the js-cookie library

// Initial state
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      // Store token in cookies
      Cookies.set('token', action.payload, { expires: 7 }); // Set token in cookies with a 7 days expiration
      // Store token in localStorage
      localStorage.setItem('token', action.payload);
    },
    removeUser: (state) => {
      state.user = null;
      state.token = null;
      // Remove token from cookies and localStorage
      Cookies.remove('token');
      localStorage.removeItem('token');
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setToken, removeUser, setError, setLoading } = userSlice.actions;

// Thunk for login
export const loginUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.post("/auth/login", { email, password });
    console.log('Login response:', response.data);
    const { token, user } = response.data;
    console.log('token response:', token);
    dispatch(setToken(token));  // Store token using setToken reducer
    dispatch(setUser(user));  // Set the user data in the store
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    dispatch(setLoading(false));
  }
};

// Thunk for logout
export const logoutUser = () => async (dispatch) => {
  dispatch(removeUser()); // Remove user and token
};

// Export the reducer
export default userSlice.reducer;
