import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


//API URL
const signupUrl = "/api/signup";
const loginUrl = "/api/login";
const logoutUrl = "/api/logout";
const getAllUsersUrl = "/api/getAllUsers"
const forgotPasswordUrl = "/api/forgotPassword";
const resetPasswordUrl = "/api/resetPassword";
const validateTokenUrl = "/api/validateToken";
const approveUserUrl = "/api/approveUser";
const rejectUserUrl = "/api/rejectUser";




//CREATE ASYNC THUNK
export const createuserAsync = createAsyncThunk("user/create", async (formData) => {
    try {
        const response = await axios.post(signupUrl, formData);
        console.log("form", formData);
        toast.success(response.data.msg);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error);
    }
});

// lOGIN ASYNC THUNK 
export const loginuserAsync = createAsyncThunk("user/login", async (logData) => {
    try {
        const response = await axios.post(loginUrl, logData);
        toast.success(response.data.msg);
        return response;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});

// lOGOUT ASYNC THUNK 
export const logoutuserAsync = createAsyncThunk("user/logout", async () => {
    try {
        const response = await axios.post(logoutUrl);
        console.log(response.data);
        return response.data;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});

// FORGET ASYNC THUNK 
export const forgetuserAsync = createAsyncThunk("user/forget", async (email) => {
    try {
        const response = await axios.post(forgotPasswordUrl, email);
        // console.log(response.data);
        toast.success(response.data.msg);
        return response.data;

    } catch (error) {
        toast.error(error.response.data.msg);
    }
});

// RESET PASSWORD ASYNC THUNK 
export const resetpasswordAsync = createAsyncThunk("user/resetPassword", async (newPassword, confirmPassword, resetToken) => {
    try {
        const response = await axios.post(resetPasswordUrl, newPassword, confirmPassword, resetToken);
        //toast.success(response.data.msg)
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('ok reset done');
        console.log(error.response.message)
    }
});

//CREATE ASYNC THUNK
export const getAllUsersAsync = createAsyncThunk("user/getAllUser", async () => {
    try {
        const response = await axios.post(getAllUsersUrl);
        console.log(response.data);
        return response.data;
    } catch (error) {
       throw error
    }
});

//CREATE ASYNC THUNK
export const approveUserAsync = createAsyncThunk("user/approveUser", async (_id) => {
    try {
        const response = await axios.post(approveUserUrl,{id:_id});
        toast.success(response.data.msg)
        return response.data;
    } catch (error) {
        toast.error(error.response.data.msg)
    }
});

//CREATE ASYNC THUNK
export const rejectUserAsync = createAsyncThunk("user/rejectUser", async (_id) => {
    try {
        const response = await axios.post(rejectUserUrl,{id:_id});
        toast.success(response.data.msg)
        return response.data;
    } catch (error) {
        toast.error(error.response.data.msg)
    }
});

//CREATE ASYNC THUNK
export const validateTokenAsync = createAsyncThunk(
    'user/validateUser',
    async (accessToken, { rejectWithValue }) => {
      try {
        const response = await axios.post(validateTokenUrl, accessToken);
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return rejectWithValue(error.response.data);
        }
        throw error;
      }
    }
  );
const savedUser = JSON.parse(localStorage.getItem('user'));


// INITIAL STATE
const initialState = {
    createUser: null,
    user:  savedUser || null,
    isAuthenticated: false,
    loading: false,
    logoutUser: null,
    clearUser: null,
    forgetPasswordEmail: null,
    resetPassword: null,
    validateToken: null,
    allUsers:[],
    approveUser:null,
    rejectUser:null
};



const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            Cookies.remove("token");
        }
    },
    extraReducers: (builder) => {
        builder

            // createuserAsync
            .addCase(createuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.createUser = action.payload;
            })

            // loginuserAsync
            .addCase(loginuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loginuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.userData;
                state.isAuthenticated = true;
                localStorage.setItem('user', JSON.stringify(action.payload.data.userData));
                Cookies.set("token", action.payload.data.accessToken);
            })

            // logoutuserAsync
            .addCase(logoutuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(logoutuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.logoutUser = action.payload;
                localStorage.removeItem('user');
                Cookies.remove("token");
            })

            // forgetuserAsync
            .addCase(forgetuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(forgetuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.forgetPasswordEmail = action.payload;
                state.forgetPasswordEmail = null;

            })

            // resetpasswordAsync
            .addCase(resetpasswordAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(resetpasswordAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.resetPassword = action.payload;

            })
            .addCase(getAllUsersAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllUsersAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.allUsers = action.payload.users;
            })
            .addCase(approveUserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(approveUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.allUsers = action.payload;
            })
            .addCase(rejectUserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(rejectUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.allUsers = action.payload;
            })
            .addCase(validateTokenAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(validateTokenAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.validateToken = action.payload;
            })
    }

})


export const { clearUser } = authSlice.actions;

export default authSlice.reducer;