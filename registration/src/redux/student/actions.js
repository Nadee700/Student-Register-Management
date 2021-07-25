import {
    LOAD_STUDENT_START, LOAD_STUDENT_SUCCESS, LOAD_STUDENT_FAIL,
    CREATE_STUDENT_START, CREATE_STUDENT_SUCCESS, CREATE_STUDENT_FAIL,
    UPDATE_STUDENT_START, UPDATE_STUDENT_SUCCESS, UPDATE_STUDENT_FAIL,
    DELETE_STUDENT_START, DELETE_STUDENT_SUCCESS, DELETE_STUDENT_FAIL
} from './constants';

export const loadStudentStart = () => ({
    type:LOAD_STUDENT_START
})

export const loadStudentSuccess = student => ({
    type:LOAD_STUDENT_SUCCESS,
    payload:{student}
})

export const loadStudentFail = error => ({
    type:LOAD_STUDENT_FAIL,
    payload:{error}
})


//=====================Create ============================
export const createStudentStart = () => ({
    type:CREATE_STUDENT_START
})

export const createStudentSuccess = std => ({
    type:CREATE_STUDENT_SUCCESS,
    payload:{std}
})

export const createStudentFail = err => ({
    type:CREATE_STUDENT_FAIL,
    payload:{err}
})

// ================== update ==============
export const updateStudentStart = () => ({
    type:UPDATE_STUDENT_START
})

export const updateStudentSuccess = id => ({
    type:UPDATE_STUDENT_SUCCESS,
    payload:{id}
})

export const updateStudentFail = err => ({
    type:UPDATE_STUDENT_FAIL,
    payload:{err}
})

// ================delete =======================
export const deleteStudentStart = () => ({
    type: DELETE_STUDENT_START
})
    
export const deleteStudentSuccess = deleStd => ({
    type: DELETE_STUDENT_SUCCESS,
    payload:{deleStd}
})

export const deleteStudentFail = err => ({
    type: DELETE_STUDENT_FAIL,
    payload:{err}
})