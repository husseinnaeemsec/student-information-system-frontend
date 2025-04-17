// features/example/exampleSlice.ts

import { createSlice } from '@reduxjs/toolkit';

interface UIStateProps {
    isSidebarOpen:boolean;
}

const initialState:UIStateProps = {
    isSidebarOpen:true,

};

const UISlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        // Define your reducer functions here
    },
});

// export const { } = exampleSlice.actions; // Export actions if you add any

export default UISlice.reducer;
