
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


//API URL
const createFormUrl = '/api/createForm';
const getAllFormsUrl = '/api/getAllForms';



//CREATE ASYNC THUNK
export const createFormAsync = createAsyncThunk("form/createForm", async (formData) => {
    try {
    const response = await axios.post(createFormUrl,formData);
    toast.success(response.data.msg)
    console.log(response)
    return response.status;
    } catch (error) {     
    toast.error(error.response.data.msg)
    }
});

//CREATE ASYNC THUNK
export const getAllFormAsync = createAsyncThunk("form/getAllForm", async () => {
    try {
    const response = await axios.post(getAllFormsUrl);
    
    //toast.success(response.data.msg)
    console.log(response)
    return response.data;
    } catch (error) {     
    throw error
    }
});

//INITIAL STATE

const initialState = {
    loading : false,
    createForm : null,
    getAllForm:[],
   
    
};

const formSlice = createSlice({
    name:'form',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(createFormAsync.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(createFormAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.createForm = action.payload;
        })
        .addCase(getAllFormAsync.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getAllFormAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.getAllForm = action.payload.formData;
        })
               
       
    }
});

export default formSlice.reducer;