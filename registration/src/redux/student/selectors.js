import { createSelector } from 'reselect'

const selectStudentState = (state) => state.student;

const selectStdIsLoading = createSelector(
    selectStudentState,
    (currentState) => currentState.isLoading,
)

const selectStdSuccessData = createSelector(selectStudentState,
     (currentState) => currentState.data.data,
)

const selectStdFail = createSelector (selectStudentState,
    (currentState) => currentState.error,    
)

// ======================== Create =========================

const selectAddStdLoading = createSelector(
    selectStudentState,
    (currentState)=>currentState,
)

const selectAddStdSuccessData = createSelector(
    selectStudentState,
    (currentState) => currentState.data,
)

const selectAddStdFail = createSelector(
    selectStudentState,
    (currentState)=> currentState.error,
)

// ======================== Update ========================
const selectUpdateStdLoading = createSelector (
    selectStudentState, 
    (currentState)=>currentState,
)
const selectUpdateStdSuccess = createSelector (
    selectStudentState, 
    (currentState)=>currentState.data,
)
const selectUpdateStdFail = createSelector (
    selectStudentState, 
    (currentState)=>currentState.error,
)

// ======================= Delete ===========================

const selectDeleteStdLoading = createSelector(
    selectStudentState, 
    (currentState)=>currentState,
)
const selectDeleteStdSuccsee = createSelector(
    selectStudentState,
    (currentState) => currentState.data,
)
const selectDeleteStdFail = createSelector(
    selectStudentState, 
    (currentState) => currentState.error,
)

// ===================== bulk delete Id ====================
const selectBulkDeleteStdStart = createSelector(
    selectStudentState,
    (currentState) => currentState
)
const selectBulkDeleteStdSuccess = createSelector(
    selectStudentState,
    (currentState) => currentState.Ids
)
const selectBulkDeleteStdFail = createSelector(
    selectStudentState,
    (currentState) => currentState.error
)

export {
    selectStdIsLoading, selectStdSuccessData, selectStdFail,
    selectAddStdLoading, selectAddStdSuccessData, selectAddStdFail,
    selectUpdateStdLoading, selectUpdateStdSuccess, selectUpdateStdFail,
    selectDeleteStdLoading, selectDeleteStdSuccsee, selectDeleteStdFail,
    selectBulkDeleteStdStart, selectBulkDeleteStdSuccess, selectBulkDeleteStdFail,
    selectStudentState

}
