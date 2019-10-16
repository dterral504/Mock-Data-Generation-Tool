import { ADD_FIELD, SET_NUM_ROWS, SET_FILE_TYPE, SET_NUM_COLS, SET_DATA_TYPE, EXPORT_CONFIG, GENERATE_DATA, SET_OPTS_INT } from "../actions/types.js";

var zipcodes = require('zipcodes');

const initialState = {
    numRows: 0,
    fileType: "CSV",
    colTypeArray: ["integer"],
    numColsArray: [0],
    colOptsArray: [{}],
    colIdArray: [0]
}


function gaussian(mean, stdev) {
    var y2;
    var use_last = false;
    return function () {
        var y1;
        if (use_last) {
            y1 = y2;
            use_last = false;
        }
        else {
            var x1, x2, w;
            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w)) / w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
        }

        var retval = mean + stdev * y1;
        if (retval > 0)
            return retval;
        return -retval;
    }
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
            console.log(state);

            var arr = [];
            var cols = state.numColsArray;
            var rows = state.numRows;
            var types = state.colTypeArray;
            var colOpts = state.colOptsArray;

            var totalCols = 0;
            for (var i = 0; i < cols.length; i++) {
                totalCols += cols[i];
            }

            // initialize array
            for (var i = 0; i < rows; i++) {
                arr.push(Array.from({ length: totalCols }, () => 0));
            }

            // fill array with each type
            var currentCol = 0;
            for (var i = 0; i < types.length; i++) {
                for (var j = 0; j < cols[i]; j++) {
                    if (types[i] == "integer") {
                        if (colOpts[i].dist == "uniform") {
                            var min = Math.ceil(colOpts[i].opts.min);
                            var max = Math.floor(colOpts[i].opts.max);
                            for (var k = 0; k < rows; k++) {
                                arr[k][currentCol] = Math.floor(Math.random() * (max - min + 1)) + min;
                            }
                        } else if (colOpts[i].dist == "normal") {
                            var mean = colOpts[i].opts.mean;
                            var stdev = colOpts[i].opts.standard_deviation;
                            var normal_dist = gaussian(mean, stdev);
                            for (var k = 0; k < rows; k++) {
                                arr[k][currentCol] = Math.floor(normal_dist());
                            }
                        }

                    } else if (types[i] == "float") {
                        if (colOpts[i].dist == "uniform") {
                            var min = colOpts[i].opts.min;
                            var max = colOpts[i].opts.max;
                            for (var k = 0; k < rows; k++) {
                                arr[k][currentCol] = Math.random() * (max - min + 1) + min;
                            }
                        } else if (colOpts[i].dist == "normal") {
                            var mean = colOpts[i].opts.mean;
                            var stdev = colOpts[i].opts.standard_deviation;
                            var normal_dist = gaussian(mean, stdev);
                            for (var k = 0; k < rows; k++) {
                                arr[k][currentCol] = normal_dist();
                            }
                        }

                    }
                    else if (types[i] == "zip-code") {
                        for (var k = 0; k < rows; k++) {
                            if (colOpts[i].dist == "uniform-usa") {
                                arr[k][currentCol] = zipcodes.random().zip;
                            }
                            else if (colOpts[i].dist == "uniform-state") {
                                var stateZipCodes = zipcodes.lookupByState(colOpts[i].opts.state);
                                arr[k][currentCol] = stateZipCodes[Math.floor(Math.random() * stateZipCodes.length)].zip;
                            }
                            else if (colOpts[i].dist == "uniform-city") {
                                var cityZipCodes = zipcodes.lookupByName(colOpts[i].opts.city, colOpts[i].opts.state);
                                arr[k][currentCol] = cityZipCodes[Math.floor(Math.random() * (cityZipCodes.length - 1))].zip;
                            }
                        }
                    }
                    else if (types[i] == "phone") {
                        if (colOpts[i].dist == "all-area-codes") {
                            for (var k = 0; k < rows; k++) {
                                var first = Math.floor(Math.random() * 1000);
                                while (first < 100) { first = Math.floor(Math.random() * 1000) }
                                var middle = Math.floor(Math.random() * 1000);
                                if (middle < 10) middle = "00" + middle.toString();
                                else if (middle < 100) middle = "0" + middle.toString();
                                var last = Math.floor(Math.random() * 10000);
                                if (last < 10) last = "000" + last.toString();
                                else if (last < 100) last = "00" + last.toString();
                                else if (last < 1000) last = "0" + last.toString();
                                arr[k][currentCol] = first + "-" + middle + "-" + last;
                            }
                        }
                        if (colOpts[i].dist == "area-codes") {
                            for (var k = 0; k < rows; k++) {
                                var middle = Math.floor(Math.random() * 1000);
                                if (middle < 10) middle = "00" + middle.toString();
                                else if (middle < 100) middle = "0" + middle.toString();
                                var last = Math.floor(Math.random() * 10000);
                                if (last < 10) last = "000" + last.toString();
                                else if (last < 100) last = "00" + last.toString();
                                else if (last < 1000) last = "0" + last.toString();
                                arr[k][currentCol] = colOpts[i].opts.areaCodes + "-" + middle + "-" + last;
                            }
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
                opts: action.payload.opts
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
