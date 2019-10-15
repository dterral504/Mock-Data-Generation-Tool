import { ADD_FIELD, SET_NUM_ROWS, SET_FILE_TYPE, SET_NUM_COLS, SET_DATA_TYPE, EXPORT_CONFIG, SET_OPTS_INT } from "../actions/types.js";

const initialState = {
    numRows: 0,
    fileType: "CSV",
    colTypeArray: ["integer"],
    numColsArray: [0],
    colOptsArray: [{}],
    colIdArray: [0]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_FIELD:
            return {
                ...state,
                colTypeArray: [...state.colTypeArray, "integer"],
                numColsArray: [...state.numColsArray, 0],
                colOptsArray: [...state.colOptsArray, {}],
                colIdArray: [...state.colIdArray, state.colIdArray.length]
            };
            break;

        case EXPORT_CONFIG:
            console.log(state);

            let contentType = "application/json;charset=utf-8;";
            var a = document.createElement('a');
            a.download = "config.json";
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(state));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            break;

        case SET_NUM_ROWS:
            return {
                ...state,
                numRows: parseInt(action.payload.value)
            };
        case SET_FILE_TYPE:
            return {
                ...state,
                fileType: action.payload.value
            };
        case SET_NUM_COLS:
            var newArr = state.numColsArray.splice(0)
            newArr[action.payload.id] = parseInt(action.payload.value)
            return {
                ...state,
                numColsArray: newArr
            };
        case SET_DATA_TYPE:
            var newArr = state.colTypeArray.splice(0)
            newArr[action.payload.id] = action.payload.value
            return {
                ...state,
                colTypeArray: newArr
            };
        case SET_OPTS_INT:
            var newArr = state.colOptsArray.splice(0)
            newArr[action.payload.id] = {
                dist: action.payload.dist,
                min: parseInt(action.payload.opts.min),
                max: parseInt(action.payload.opts.max)
            }
            console.log(newArr);
            return {
                ...state,
                colOptsArray: newArr
            }
        default:
            return state;
    }
}
