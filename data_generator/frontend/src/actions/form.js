// import axios from 'axios';

import { ADD_FIELD, SET_NUM_ROWS, SET_FILE_TYPE, SET_DATA_TYPE, SET_NUM_COLS, EXPORT_CONFIG, GENERATE_DATA, SET_OPTS_INT, SET_CAT_NAME, SET_CAT_PROB, ADD_CATEGORY } from './types';

// GET LEADS
export const addField = () => {
    return {
        type: ADD_FIELD
    }
};

// EXPORT CONFIG
export const exportConfig = () => {
    return {
        type: EXPORT_CONFIG
    }
};

// SET NUM ROWS
export const setNumRows = (value) => {
    return {
        type: SET_NUM_ROWS,
        payload: { value }
    }
};

// SET FILE TYPE
export const setFileType = (value) => {
    return {
        type: SET_FILE_TYPE,
        payload: { value }
    }
};

// SET NUM COLS
export const setNumCols = (value, id) => {
    return {
        type: SET_NUM_COLS,
        payload: { value, id }
    }
};

// SET DATA TYPE
export const setDataType = (value, id) => {
    return {
        type: SET_DATA_TYPE,
        payload: { value, id }
    }
};

// SET GENERATE DATA
export const generateData = () => {
    return {
        type: GENERATE_DATA
    }
};

// SET OPTS INT
export const setOptsInt = (dist, opts, id) => {
    return {
        type: SET_OPTS_INT,
        payload: { dist, opts, id }
    }
};

// SET CATEGORY NAME
export const setCategoryName = (colOptsArray, value, id, catid) => {
    return {
        type: SET_CAT_NAME,
        payload: { colOptsArray, value, id, catid }
    }
}

// SET CATEGORY PROBABILITY
export const setCategoryProb = (colOptsArray, value, id, catid) => {
    return {
        type: SET_CAT_PROB,
        payload: { colOptsArray, value, id, catid }
    }
}

export const addCategory = (colOptsArray, id) => {
    return {
        type: ADD_CATEGORY,
        payload: { colOptsArray, id }
    }
}
