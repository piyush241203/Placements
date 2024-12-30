import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance"; // Assuming axiosInstance is already configured

// Thunks for asynchronous actions

// Create Job with Eligibility Criteria
export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/jobs/create", jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get All Jobs (TNP Admin)
export const getAllJobs = createAsyncThunk(
  "jobs/getAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/jobs/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Eligible Jobs for Students
export const getEligibleJobs = createAsyncThunk(
  "jobs/getEligibleJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/jobs/eligible");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Job
export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Apply for Job
export const applyForJob = createAsyncThunk(
  "jobs/applyForJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/jobs/${jobId}/apply`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Rounds Creation
export const createRounds = createAsyncThunk(
  "jobs/createRounds",
  async ({ jobId, rounds }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/jobs/${jobId}/rounds`, { rounds });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Round Results
export const updateRoundResults = createAsyncThunk(
  "jobs/updateRoundResults",
  async ({ jobId, roundId, qualifiedStudents }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/jobs/${jobId}/rounds/${roundId}`, { qualifiedStudents });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    jobDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Job
      .addCase(createJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload.job);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Jobs
      .addCase(getAllJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Eligible Jobs
      .addCase(getEligibleJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEligibleJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
      })
      .addCase(getEligibleJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Job
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.filter(job => job._id !== action.payload.jobId);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Apply for Job
      .addCase(applyForJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobDetails = action.payload.job; // Update job details after applying
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Rounds
      .addCase(createRounds.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRounds.fulfilled, (state, action) => {
        state.loading = false;
        const job = state.jobs.find(job => job._id === action.payload.jobId);
        if (job) {
          job.rounds = action.payload.rounds;
        }
      })
      .addCase(createRounds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Round Results
      .addCase(updateRoundResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRoundResults.fulfilled, (state, action) => {
        state.loading = false;
        const job = state.jobs.find(job => job._id === action.payload.jobId);
        if (job) {
          const round = job.rounds.find(round => round._id === action.payload.round._id);
          if (round) {
            round.qualifiedStudents = action.payload.round.qualifiedStudents;
          }
        }
      })
      .addCase(updateRoundResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobsSlice.reducer;
