import {
    loadStudentStart,
    loadStudentSuccess,
    loadStudentFail,
    createStudentStart,
    createStudentSuccess,
    createStudentFail,
    updateStudentStart,
    updateStudentSuccess,
    updateStudentFail,
    deleteStudentStart,
    deleteStudentSuccess,
    deleteStudentFail
} from './actions'
import axios from 'axios';

// GET Request
export const loadStudentData = () => async(dispatch)=> {
    try{
        dispatch(loadStudentStart());
        const response = await axios ({
            method:'GET',
            url:'https://localhost:44307/api/Students',
        });
        console.log("thunk after", response)
        dispatch(loadStudentSuccess(response));
    }catch(err){
        dispatch(loadStudentFail(err));
    }
}

// POST Request
export const createStudent = (std) => async(dispatch)=> {
    try{
     
        dispatch(createStudentStart());

        const response = await axios ({
            method:'POST',
            url:'https://localhost:44307/api/Students',
            data:std
        });

        dispatch(createStudentSuccess(response));
    }catch(err){
        dispatch(createStudentFail(err));
    }
}

// Update Request
export const updateStudent = (std) => async(dispatch)=> {
    try{
     
        dispatch(updateStudentStart());

        const response = await axios({
            method: 'put',
            url:`https://localhost:44307/api/Students/${std.id}`,
            data: std
          });
      
        dispatch(updateStudentSuccess(response));
    }catch(err){
        dispatch(updateStudentFail(err));
    }
}

// Delete Request
export const deleteStudent = (id) => async(dispatch)=> {
    try{
          console.log("delete", id)
        dispatch(deleteStudentStart());

        const response = await axios({
            method: 'delete',
            url:`https://localhost:44307/api/Students/${id}`,
        });
      console.log(response)
        dispatch(deleteStudentSuccess(response));
    }catch(err){
        dispatch(deleteStudentFail(err));
    }
}
