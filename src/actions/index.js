import * as actionTypes from "./types";
export const showData = task => {
    return {
        type: actionTypes.show_data,
        payload: {
            task
        }
    };
};

export const addData = newData => {
    return {
        type: actionTypes.add_data,
        payload: {
            newData
        }
    };
};

export const deleteData = taskid => {
    return {
        type: actionTypes.delete_data,
        payload: {
            taskid
        }
    };
};

export const editData = (taskid, newData) => {
    return {
        type: actionTypes.edit_data,
        payload: {
            taskid, newData
        }
    };
};

export const checkStatus = (taskid) => {
    return {
        type: actionTypes.check_status,
        payload: {
            taskid
        }
    }
}