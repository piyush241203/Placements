import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie"; // Import js-cookie library

// Thunk for login functionality
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      const { token } = response.data.user;

      // Store token securely using Cookies.set
      Cookies.set("token", token, {
        path: "/",
        secure: process.env.NODE_ENV === "production", // Ensure the cookie is sent only over HTTPS
        sameSite: "Strict", // Prevent cross-site usage
        expires: 7, // Optional: Token expires in 7 days
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Login failed");
    }
  }
);

// Thunk for logout functionality
// Thunk for logout functionality
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Call the logout API
      await axiosInstance.post("/auth/logout");

      // Clear token from cookies
      Cookies.remove("token", { path: "/" }); // Ensure the path matches

      // Remove persist:root from localStorage to clear Redux state
      localStorage.removeItem("persist:root");

      return {}; // Return an empty object
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Logout failed");
    }
  }
);


// Thunk for fetching user by ID
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/auth/user/${userId}`);
      return response.data.user; // Ensure we are only returning the user object
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch user");
    }
  }
);

export const getProfileCompletionDetails = createAsyncThunk(
  "user/getProfileCompletionDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/get-profile-completion");
      return response.data.profileDetails; // Return profile completion details
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch profile completion details");
    }
  }
);

// Thunk for updating student profile
export const updateStudentProfile = createAsyncThunk(
  "user/updateStudentProfile",
  async (profileUpdates, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/auth/update-profile/${profileUpdates.studentId}`, profileUpdates);
      return response.data; // Return updated student profile
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

// Thunk for updating profile picture
export const updateProfilePic = createAsyncThunk(
  "user/updateProfilePic",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/auth/updateProfilePic", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // For file upload
        },
      });
      return response.data.profilePic; // Return the new profile picture URL
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile picture");
    }
  }
);



const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: Cookies.get("token") || null, // Fetch token from cookies
    profileCompletionDetails: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.user = null;
      state.token = null;
      state.profileCompletionDetails = []; 
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.user.token;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = "succeeded";
        state.error = null;
        // Refresh the page to log out the user
        window.location.reload();
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload; // Set the fetched user data
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getProfileCompletionDetails.fulfilled, (state, action) => {
        state.profileCompletionDetails = action.payload; // Store profile completion details
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getProfileCompletionDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateStudentProfile.fulfilled, (state, action) => {
        // Replace the whole user object with the updated profile
        state.user = { ...state.user, profile: action.payload.profile };
        state.status = "succeeded";
      })
    .addCase(updateStudentProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
    .addCase(updateProfilePic.fulfilled, (state, action) => {
      // Update the profile picture URL in the state
      state.user.profile.profilePic = action.payload;
      state.status = "succeeded";
    })
    .addCase(updateProfilePic.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;
