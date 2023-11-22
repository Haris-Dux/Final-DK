
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


//API URL
const createDesignationUrl = '/api/createDesignation';
const getDesignationUrl = '/api/getAllDesignation';
const deleteDesignationUrl = '/api/deleteDesignation';

//CREATE ASYNC THUNK
export const createDesignationAsync = createAsyncThunk("designation/createDesignation", async (formData) => {
    try {
    const response = await axios.post(createDesignationUrl,formData);
    toast.success(response.data.msg)
    return response.data;
    } catch (error) {
    toast.error(error.response.data.msg)
    }
});

//CREATE ASYNC THUNK
export const getDesignationAsync = createAsyncThunk("designation/getDesignation", async () => {
    try {
    const response = await axios.post(getDesignationUrl);
    return response.data;
    } catch (error) {
       throw error;
    }
});

//CREATE ASYNC THUNK
export const deleteDesignationAsync = createAsyncThunk("designation/deleteDesignation", async (_id) => {
    try {
    const response = await axios.post(deleteDesignationUrl,{id:_id});
    toast.success(response.data.msg)
    return response.data;
    } catch (error) {
    toast.error(error.response.data.msg)
    }
});

//INITIAL STATE

const initialState = {
    loading : false,
    createDesignation : null,
    getAllDesignation:[],
    deleteDesignation:null
};

const designationSlice = createSlice({
    name:'designation',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(createDesignationAsync.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(createDesignationAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.createDesignation = action.payload;
        })
        .addCase(getDesignationAsync.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getDesignationAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.getAllDesignation = action.payload.designationData;
        })
        .addCase(deleteDesignationAsync.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(deleteDesignationAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.deleteDesignation = action.payload;
        })
    }
});

export default designationSlice.reducer;