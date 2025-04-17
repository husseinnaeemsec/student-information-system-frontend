// src/features/user/userSlice.ts
import { createSlice} from '@reduxjs/toolkit';


export interface ClassRoom{
    id:number;
    name:string;
}

export interface Student {
    id:number;
    first_name:string;
    last_name:string;
    third_name:string;
    date_of_birth:string;
    class_room:ClassRoom;
    gender:"male"|"female";
}

interface initialStateProps {
    students:Student[] | [] ;

}

const initialState :initialStateProps = {
    students:[]
};


const userSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        setStudents:((state,action)=>{
            state.students = action.payload;
        })
    },
});

// export const {  } = userSlice.actions;
export default userSlice.reducer;
