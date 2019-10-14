import { ADD_FIELD } from "../actions/types.js";
import { EXPORT_CONFIG } from "../actions/types.js";


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

        default:
            return state;
    }
}
