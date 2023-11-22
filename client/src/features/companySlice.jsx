import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


//API URL
const createCompanyUrl = '/api/createCompany';
const getCompaniesUrl = '/api/getAllCompanies';
const deleteCompanyUrl = '/api/deleteCompany';

//CREATE ASYNC THUNK
export const createCompanyAsync = createAsyncThunk("company/createCmpany", async (formData) => {
    try {
    const response = await axios.post(createCompanyUrl,formData);
    toast.success(response.data.msg)
    return response.data;
    } catch (error) {
        toast.error(error.response.data.msg)
    }
});

//CREATE ASYNC THUNK
export const getAllCompaniesAsync = createAsyncThunk("company/getAllCompanies", async () => {
    try {
    const response = await axios.post(getCompaniesUrl);
    return response.data;
    } catch (error) {
    console.log(error)
    }
});

//CREATE ASYNC THUNK
export const deleteCompanyAsync = createAsyncThunk("company/deleteCompany", async (_id) => {
    try {
    const response = await axios.post(deleteCompanyUrl,{id:_id});
    toast.success(response.data.msg)
    return response.data;
    } catch (error) {
    toast.error(error.response.data.msg)
    }
});

//INITIAL STATE
const initialState = {
    loading : false,
    createCompany : null,
    getAllCompanies:[],
    deleteCompany:null
};

const companySlice = createSlice({
    name:'company',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(createCompanyAsync.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(createCompanyAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.createCompany = action.payload;
        })
        .addCase(getAllCompaniesAsync.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getAllCompaniesAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.getAllCompanies = action.payload.companyData;
        })
        .addCase(deleteCompanyAsync.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(deleteCompanyAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.deleteCompany = action.payload;
        })
    }
})

export default companySlice.reducer;