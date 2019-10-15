import { ADD_FIELD, SET_NUM_ROWS, SET_FILE_TYPE, SET_NUM_COLS, SET_DATA_TYPE, EXPORT_CONFIG, GENERATE_DATA, SET_OPTS_INT } from "../actions/types.js";

var faker = require('faker');
var zipcodes = require('zipcodes');

const initialState = {
    numRows: 0,
    fileType: "CSV",
    colTypeArray: ["integer"],
    numColsArray: [0],
    colOptsArray: [{}],
    colIdArray: [0]
}


function generateData() {
    console.log(state);
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
            return state;
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
        case GENERATE_DATA:
            console.log("here");
            //generateData();
            console.log(state);

            var arr = [];
            var cols = state.numColsArray;
            var rows = state.numRows;
            var types = state.colTypeArray;
            var max = 100;
            var totalCols = 0;

            for (var i = 0; i < cols.length; i++) {
                totalCols += parseInt(cols[i]);
            }

            // initialize array
            for (var i = 0; i < rows; i++) {
                arr.push(Array.from({ length: totalCols }, () => 0));
            }

            // fill array with each type
            var currentCol = 0;
            for (var i=0; i<types.length; i++){
                for(var j=0; j<cols[i]; j++){
                    if(types[i]=="integer"){
                        for(var k=0; k<rows; k++) {
                            arr[k][currentCol] = Math.floor(Math.random() * max);
                        }
                    }
                    else if(types[i]=="name"){
                        for(var k=0; k<rows; k++) {
                            arr[k][currentCol] = faker.name.findName();
                        }
                    }
                    else if(types[i]=="zip-codes"){
                        var options = "random";
                        for(var k=0; k<rows; k++) {
                            if(options=="random"){
                                arr[k][currentCol] = zipcodes.random().zip;
                            }
                            else if (options == "state"){
                                arr[k][currentCol] = zipcodes.lookupByState('MA')[0].zip;
                            }
                            else if (options == "cityState"){
                                arr[k][currentCol] = zipcodes.lookupByName('Austin', 'TX')[0].zip;
                            }
                        }
                    }
                    else if(types[i]=="phone-number"){
                        var areaCode = "512";
                        for(var k=0; k<rows; k++) {
                            arr[k][currentCol] = areaCode + Math.floor(Math.random() * 10000000).toString();
                        }
                    }
                    currentCol++;
                }
            }

            contentType = "application/csv;charset=utf-8;";
            var a = document.createElement('a');
            a.download = "config.csv";
            a.href = 'data:' + contentType + ',' + arr.map(e => e.join(",")).join("\n");
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            return state;

            break;
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
