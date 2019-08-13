import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';
const taskReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.add_data:
            let newData = Object.assign([], state)
            newData.push(action.payload)
            state = newData
            break;

        case actionTypes.delete_data:
            let deletedData = Object.assign([], state)
            let deletedata = deletedData.filter(did => did.newData.id != action.payload.taskid)
            state = deletedata
            break;

        case actionTypes.edit_data:
            let editData = Object.assign([], state)
            let edata = editData.find((tid) => tid.newData.id == action.payload.taskid)
            edata.newData.item = action.payload.newData;
            state = editData;
            break;

        case actionTypes.check_status:
            let taskStatus = Object.assign([], state)
            let statusdata = taskStatus.find((tid) => tid.newData.id == action.payload.taskid)
            statusdata.newData.status = !statusdata.newData.status
            state = taskStatus;
            break;
    }
    return state;
}

const rootReducer = combineReducers({
    list: taskReducer,
});
export default rootReducer