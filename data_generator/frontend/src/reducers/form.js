import { ADD_FIELD, SET_NUM_ROWS, SET_FILE_TYPE, SET_NUM_COLS, SET_DATA_TYPE, EXPORT_CONFIG, GENERATE_DATA, SET_OPTS_INT, SET_CAT_NAME, ADD_CATEGORY, SET_CAT_PROB, SET_CAT_DIST, SET_CORRELATION_OPTS, REMOVE_CORRELATED_COL, SET_FILE_NAME, IMPORT_CONFIG } from "../actions/types.js";

var moment = require('moment');
var zipcodes = require('zipcodes');

const initialState = {
    numRows: 0,
    fileType: "CSV",
    fileName: "data",
    colTypeArray: ["integer"],
    numColsArray: [0],
    colOptsArray: [{}],
    colIdArray: [0]
}



function correlation(x1, slope, intercept, stddev) {
    var y = slope * x1
    var normal_dist = gaussian(intercept, stddev);
    var err = normal_dist();
    return y + err;
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

            let contentType = "application/json;charset=utf-8;";
            var a = document.createElement('a');
            a.download = state.fileName + "_config.json";
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(state));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            return state;
        case IMPORT_CONFIG:
            // you can access the JSON object here using action.payload.value
            console.log("inside of import config");
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
        case SET_FILE_NAME:
            return {
                ...state,
                fileName: action.payload.value
            }
        case SET_NUM_COLS:
            var newArr = state.numColsArray.splice(0)
            var newVal = parseInt(action.payload.value)
            newArr[action.payload.id] = newVal
            if (newVal != 1) {
                return {
                    ...state,
                    numColsArray: newArr,
                    hasCorrelation: false
                };
            } else {
                return {
                    ...state,
                    numColsArray: newArr
                };
            }

        case SET_DATA_TYPE:
            var newTypeArr = state.colTypeArray.splice(0)
            newTypeArr[action.payload.id] = action.payload.value
            var newOptsArr = state.colOptsArray.splice(0)
            if (action.payload.value == "categorical") {
                var categoryIdArray = [0, 1]
                var categoryNameArray = ["", ""]
                var categoryProbArray = [0, 0]
                newOptsArr[action.payload.id] = {
                    dist: "",
                    categoryIdArray: categoryIdArray,
                    categoryNameArray: categoryNameArray,
                    categoryProbArray, categoryProbArray,
                    hasCorrelation: false
                }
                return {
                    ...state,
                    colTypeArray: newTypeArr,
                    colOptsArray: newOptsArr
                }
            } else {
                newOptsArr[action.payload.id] = {
                    dist: "",
                    hasCorrelation: false
                }
                return {
                    ...state,
                    colTypeArray: newTypeArr,
                    colOptsArray: newOptsArr
                };
            }

        case SET_CAT_DIST:
            var newArr = action.payload.colOptsArray.splice(0)
            var currOpts = newArr[action.payload.id]
            var newOpts = {
                ...currOpts,
                dist: action.payload.dist
            }
            newArr[action.payload.id] = newOpts
            return {
                ...state,
                colOptsArray: newArr
            };
        case SET_CAT_NAME:
            var newArr = action.payload.colOptsArray.splice(0)
            var currOpts = newArr[action.payload.id]
            var currNames = currOpts.categoryNameArray.splice(0)
            currNames[action.payload.catid] = action.payload.value
            var newOpts = {
                ...currOpts,
                dist: action.payload.dist,
                categoryNameArray: currNames
            }
            newArr[action.payload.id] = newOpts
            return {
                ...state,
                colOptsArray: newArr
            };
        case SET_CAT_PROB:
            var newArr = action.payload.colOptsArray.splice(0)
            var currOpts = newArr[action.payload.id]
            var currProbs = currOpts.categoryProbArray.splice(0)
            currProbs[action.payload.catid] = parseInt(action.payload.value)
            var newOpts = {
                ...currOpts,
                dist: action.payload.dist,
                categoryProbArray: currProbs
            }
            newArr[action.payload.id] = newOpts
            return {
                ...state,
                colOptsArray: newArr
            };

        case ADD_CATEGORY:
            var newArr = action.payload.colOptsArray.splice(0)
            var currOpts = newArr[action.payload.id]
            var newOpts = {
                ...currOpts,
                categoryIdArray: [...currOpts.categoryIdArray, currOpts.categoryIdArray.length],
                categoryNameArray: [...currOpts.categoryNameArray, ""],
                categoryProbArray: [...currOpts.categoryProbArray, 0]
            }
            newArr[action.payload.id] = newOpts
            return {
                ...state,
                colOptsArray: newArr
            };

        case GENERATE_DATA:

            var arr = [];
            var cols = state.numColsArray;
            var rows = state.numRows;
            var types = state.colTypeArray;
            var colOpts = state.colOptsArray;
            var fileType = state.fileType;

            var totalCols = 0;
            for (var i = 0; i < cols.length; i++) {
                totalCols += cols[i];
                if (colOpts[i].hasCorrelation == true) {
                    totalCols++;
                }
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
                        if (colOpts[i].hasCorrelation == false) {
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
                        } else if (colOpts[i].hasCorrelation == true) {
                            if (colOpts[i].dist == "uniform") {
                                var min = Math.ceil(colOpts[i].opts.min);
                                var max = Math.floor(colOpts[i].opts.max);
                                for (var k = 0; k < rows; k++) {
                                    var val = Math.random() * (max - min + 1) + min;
                                    var correlatedVal = correlation(val, colOpts[i].correlationOpts.slope, colOpts[i].correlationOpts.intercept, colOpts[i].correlationOpts.stddev);
                                    arr[k][currentCol] = Math.floor(val);
                                    arr[k][currentCol + 1] = Math.floor(correlatedVal);
                                }
                            } else if (colOpts[i].dist == "normal") {
                                var mean = colOpts[i].opts.mean;
                                var stdev = colOpts[i].opts.standard_deviation;
                                var normal_dist = gaussian(mean, stdev);
                                for (var k = 0; k < rows; k++) {
                                    var val = normal_dist();
                                    var correlatedVal = correlation(val, colOpts[i].correlationOpts.slope, colOpts[i].correlationOpts.intercept, colOpts[i].correlationOpts.stddev);
                                    arr[k][currentCol] = Math.floor(val);
                                    arr[k][currentCol + 1] = Math.floor(correlatedVal);
                                }
                            }
                            currentCol++;
                        }

                    } else if (types[i] == "float") {
                        if (colOpts[i].hasCorrelation == false) {
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
                        } else if (colOpts[i].hasCorrelation == true) {
                            if (colOpts[i].dist == "uniform") {
                                var min = colOpts[i].opts.min;
                                var max = colOpts[i].opts.max;
                                for (var k = 0; k < rows; k++) {
                                    var val = Math.random() * (max - min + 1) + min;
                                    arr[k][currentCol] = val;
                                    arr[k][currentCol + 1] = correlation(val, colOpts[i].correlationOpts.slope, colOpts[i].correlationOpts.intercept, colOpts[i].correlationOpts.stddev);
                                }
                            } else if (colOpts[i].dist == "normal") {
                                var mean = colOpts[i].opts.mean;
                                var stdev = colOpts[i].opts.standard_deviation;
                                var normal_dist = gaussian(mean, stdev);
                                for (var k = 0; k < rows; k++) {
                                    var val = normal_dist();
                                    arr[k][currentCol] = val;
                                    arr[k][currentCol + 1] = correlation(val, colOpts[i].correlationOpts.slope, colOpts[i].correlationOpts.intercept, colOpts[i].correlationOpts.stddev);
                                }
                            }
                            currentCol++;
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
                    else if (types[i] == "categorical") {
                        if (colOpts[i].dist == "uniform") {
                            for (var k = 0; k < rows; k++) {
                                var rand = Math.floor(Math.random() * colOpts[i].categoryIdArray.length)
                                arr[k][currentCol] = colOpts[i].categoryNameArray[rand]
                            }
                        }
                        if (colOpts[i].dist == "multinomial") {
                            var nameArr = colOpts[i].categoryNameArray
                            var probArr = colOpts[i].categoryProbArray
                            var catList = []
                            var total = 0
                            for (var x = 0; x < nameArr.length; x++) {
                                var name = nameArr[x]
                                for (var y = 0; y < probArr[x]; y++) {
                                    catList.push(name)
                                }
                                total = total + probArr[x]
                            }
                            for (var k = 0; k < rows; k++) {
                                var rand = Math.floor(Math.random() * total)
                                arr[k][currentCol] = catList[rand]
                            }
                        }
                    }
                    else if (types[i] == "date-time") {
                        if (colOpts[i].dist == "date") {
                            var date = "12/25/1995";
                            for (var k = 0; k < rows; k++) {
                                arr[k][currentCol] = moment(date, "MM-DD-YYYY").add(k,'day').format('LL');
                            }
                        }
                        if (colOpts[i].dist == "timestamp") {
                            var date = "12/25/1995 4:30";
                            for (var k = 0; k < rows; k++) {
                                arr[k][currentCol] = moment(date, "MM-DD-YYYY HH:mm").add(k,'hour').format('LLL');
                            }
                        }
                    }
                    currentCol++;
                }
            }

            contentType = "application/csv;charset=utf-8;";
            var a = document.createElement('a');
            a.download = state.fileName + ".csv";
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
                opts: action.payload.opts,
                hasCorrelation: false
            }
            return {
                ...state,
                colOptsArray: newArr
            }
        case SET_CORRELATION_OPTS:
            var newArr = state.colOptsArray.splice(0)
            var newOpts = newArr[action.payload.id]
            newOpts = {
                ...newOpts,
                correlationOpts: action.payload.correlationOpts,
                hasCorrelation: true
            }
            newArr[action.payload.id] = newOpts
            return {
                ...state,
                colOptsArray: newArr
            }
        case REMOVE_CORRELATED_COL:
            var newArr = state.colOptsArray.splice(0)
            var newOpts = newArr[action.payload.id]
            newOpts = {
                ...newOpts,
                hasCorrelation: false
            }
            newArr[action.payload.id] = newOpts
            return {
                ...state,
                colOptsArray: newArr
            }
        default:
            return state;
    }
}
