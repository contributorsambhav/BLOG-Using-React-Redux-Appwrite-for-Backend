import { createSlice } from "@reduxjs/toolkit";

const initialState={
    count : 1,
    theme:"light"
}

const themeSlice = createSlice({
    name : "themeMode",
    initialState,
    reducers : {
        modeToggle: (state)=>{
            if (state.count%2 == 0 ){
                state.theme = "dark"
            }else{
                state.theme = 'light'
            }
            state.count+=1
        },
        

    }
})

export const {modeToggle} = themeSlice.actions

export default themeSlice.reducer