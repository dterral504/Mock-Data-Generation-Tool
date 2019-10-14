// import axios from 'axios';
import { ADD_FIELD, SET_NUM_ROWS, SET_FILE_TYPE, SET_DATA_TYPE, SET_NUM_COLS } from './types';

// GET LEADS
export const addField = () => {
    return {
        type: ADD_FIELD
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