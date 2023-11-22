import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import companySlice from "../features/companySlice";
import designationSlice from "../features/designationSlice";
import formSlice from "../features/formSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        company:companySlice,
        designation:designationSlice,
        form:formSlice
    },
});