import {
    LOAD_STUDENT_START, LOAD_STUDENT_SUCCESS, LOAD_STUDENT_FAIL,
    CREATE_STUDENT_START, CREATE_STUDENT_SUCCESS, CREATE_STUDENT_FAIL,
    UPDATE_STUDENT_START, UPDATE_STUDENT_SUCCESS, UPDATE_STUDENT_FAIL, 
    DELETE_STUDENT_START, DELETE_STUDENT_SUCCESS, DELETE_STUDENT_FAIL,
    BULK_DELETE_STUDENT_START, BULK_DELETE_STUDENT_SUCCESS, BULK_DELETE_STUDENT_FAIL
} from './constants';

const INITIAL_STATE = {
    isLoading : true,
    data:[],
    errors:null,
    addSucess: null,
    upSuccess:null,
    deleSuccess:null,
    getByIdSuccess:null,
}

export const student = (state = INITIAL_STATE, {type, payload}) => {
    switch(type){
        case LOAD_STUDENT_START:{
            return loadStudentStart(state)
        }
        case LOAD_STUDENT_SUCCESS:{
            return loadStudentSuccess(state,payload)
        }
        case LOAD_STUDENT_FAIL:{
            return loadStudentFail(state,payload)
        }
        case CREATE_STUDENT_START:{
            return createStudentStart(state)
        }
        case CREATE_STUDENT_SUCCESS:{
            return createStudentSuccess(state,payload)
        }
        case CREATE_STUDENT_FAIL:{
            return createStudentFail(state,payload)
        }
        case UPDATE_STUDENT_START:{
            return updateStudentStart(state)
        }
        case UPDATE_STUDENT_SUCCESS:{
            return updateStudentSuccess(state,payload)
        }
        case UPDATE_STUDENT_FAIL:{
            return updateStudentFail(state,payload)
        }
        case DELETE_STUDENT_START:{
            return deleteStudentStart(state)
        }
        case DELETE_STUDENT_SUCCESS:{
            return deleteStudentSuccess(state,payload)
        }
        case DELETE_STUDENT_FAIL:{
            return deleteStudentFail(state, payload)
        }
        case BULK_DELETE_STUDENT_START:{
            return bulkDeleteStudentStart(state)
        }
        case BULK_DELETE_STUDENT_SUCCESS:{
            return bulkDeleteStudentSuccess(state,payload)
        }
        case BULK_DELETE_STUDENT_FAIL:{
            return bulkDeleteStudenetFail(state, payload)
        }
        default:
            return state;
    }
}

function loadStudentStart(state){
    return {
        ...state,
        isLoading:true,   
    }
}

function loadStudentSuccess(state, { student }){
    return {
        ...state,
        isLoading:false,
        data:student,
    }
}

function loadStudentFail(state, { error }){
    return{
        ...state,
        isLoading:false,
        errors:error
    }
}

// ==================== Create student ============================
function createStudentStart(state){
    return {
        ...state,
        isLoading:true,
    }
}

function createStudentSuccess(state, {std}){
    return{
        ...state,
        addSucess:std,
        isLoading:false,
    }
}

function createStudentFail(state,{err}){
    return{
        ...state,
        isLoading:false,
        errors:err
    }
}

// ============= Update student =================
function updateStudentStart(state){
    return{
        ...state,
        isLoading:true,
    }
}

function updateStudentSuccess(state, {id}){
    return{
        ...state,
        isLoading:false,
        upSuccess:id
    }
}

function updateStudentFail(state, {err}){
    return{
        ...state,
        isLoading:false,
        error:err
    }
}

// ============= Delete student =================
function deleteStudentStart(state){
    return{
        ...state,
        isLoading:true
    }
}
function deleteStudentSuccess(state, {data}){
    return{
        ...state,
        isLoading:false,
        deleSuccess:data
    }
}
function deleteStudentFail(state, {err}){
    return{
        ...state,
        isLoading:false,
        errors:err
    }
}

// =========== bulk delete by Ids =======================
function bulkDeleteStudentStart(state){
    return {
        ...state,
        isLoading:true
    }
}
function bulkDeleteStudentSuccess(state, {Ids}){
    return{
        ...state,
        isLoading:false,
        getByIdSuccess:Ids
    }
}
function bulkDeleteStudenetFail(state, {error}){
    return{
        ...state,
        isLoading:false,
        error:error
    }
}