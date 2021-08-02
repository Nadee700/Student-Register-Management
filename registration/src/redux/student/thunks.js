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
    deleteStudentFail,
    bulkDeleteStudentStart,
    bulkDeleteStudentSuccess,
    bulkDeleteStudenetFail
} from './actions'
import axios from 'axios';
import { Err } from 'joi-browser';

// GET Request
export const loadStudentData = () => async(dispatch)=> {
    try{
        dispatch(loadStudentStart());
        const response = await axios ({
            method:'GET',
            url:'https://localhost:44307/api/Students/GetStudent',
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
            url:'https://localhost:44307/api/Students/PostStudent',
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
            method: 'PUT',
            url:`https://localhost:44307/api/Students/PutStudent/${std.id}`,
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
            method: 'DELETE',
            url:`https://localhost:44307/api/Students/DeleteStudent/${id}`,
        });
      console.log(response)
        dispatch(deleteStudentSuccess(response));
    }catch(err){
        dispatch(deleteStudentFail(err));
    }
}

//Bulk Delete Request
export const bulkDeleteStudent = (ids) => async(dispatch)=> {
    try{
        dispatch(bulkDeleteStudentStart());

        const response = await axios({
            method: 'POST',
            url:`https://localhost:44307/api/Students/BulkDelete`,
            data: ids
        });

        dispatch(bulkDeleteStudentSuccess(response))
    }catch(err){
        dispatch(bulkDeleteStudenetFail(Err))
    }
}
