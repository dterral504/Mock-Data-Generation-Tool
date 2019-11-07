import { ADD_FIELD, SET_NUM_ROWS, SET_FILE_TYPE, SET_NUM_COLS, SET_DATA_TYPE, EXPORT_CONFIG, GENERATE_DATA, SET_OPTS_INT, SET_CAT_NAME, ADD_CATEGORY, SET_CAT_PROB, SET_CAT_DIST } from "../actions/types.js";

var zipcodes = require('zipcodes');

const initialState = {
    numRows: 0,
    fileType: "CSV",
    colTypeArray: ["integer"],
    numColsArray: [0],
    colOptsArray: [{}],
    colIdArray: [0]
}

// // ****************************************************************
// // ****************************************************************
// // ****************************************************************

// var Sampling = SJS = (function(){

//     // Utility functions
//     function _sum(a, b) {
// 	return a + b;
//     };
//     function _fillArrayWithNumber(size, num) {
// 	// thanks be to stackOverflow... this is a beautiful one-liner
// 	return Array.apply(null, Array(size)).map(Number.prototype.valueOf, num);
//     };
//     function _rangeFunc(upper) {
// 	var i = 0, out = [];
// 	while (i < upper) out.push(i++);
// 	return out;
//     };
//     // Prototype function
//     function _samplerFunction(size) {
// 	if (!Number.isInteger(size) || size < 0) {
// 	  throw new Error ("Number of samples must be a non-negative integer.");
// 	}
// 	if (!this.draw) {
// 	    throw new Error ("Distribution must specify a draw function.");
// 	}
// 	var result = [];
// 	while (size--) {
// 	    result.push(this.draw());
// 	}
// 	return result;
//     };
//     // Prototype for discrete distributions
//     var _samplerPrototype = {
// 	sample: _samplerFunction
//     };

//     function Bernoulli(p) {

// 	var result = Object.create(_samplerPrototype);

// 	result.draw = function() {
// 	    return (Math.random() < p) ? 1 : 0;
// 	};

// 	result.toString = function() {
// 	    return "Bernoulli( " + p + " )";
// 	};

// 	return result;
//     }

//     function Binomial(n, p) {

// 	var result = Object.create(_samplerPrototype),
// 	bern = Sampling.Bernoulli(p);

// 	result.draw = function() {
// 	    return bern.sample(n).reduce(_sum, 0); // less space efficient than adding a bunch of draws, but cleaner :)
// 	}

// 	result.toString = function() { 
// 	    return "Binom( " + 
// 		[n, p].join(", ") + 
// 		" )"; 
// 	}

// 	return result;
//     }

//     function Discrete(probs) { // probs should be an array of probabilities. (they get normalized automagically) //

// 	var result = Object.create(_samplerPrototype),
// 	k = probs.length;

// 	result.draw = function() {
// 	    var i, p;
// 	    for (i = 0; i < k; i++) {
// 		p = probs[i] / probs.slice(i).reduce(_sum, 0); // this is the (normalized) head of a slice of probs
// 		if (Bernoulli(p).draw()) return i;             // using the truthiness of a Bernoulli draw
// 	    }
// 	    return k - 1;
// 	};

// 	result.sampleNoReplace = function(size) {
// 	    if (size>probs.length) {
// 		throw new Error("Sampling without replacement, and the sample size exceeds vector size.")
// 	    }
// 	    var disc, index, sum, samp = [];
// 	    var currentProbs = probs;
// 	    var live = _rangeFunc(probs.length);
// 	    while (size--) {
// 		sum = currentProbs.reduce(_sum, 0);
// 		currentProbs = currentProbs.map(function(x) {return x/sum; });
// 		disc = SJS.Discrete(currentProbs);
// 		index = disc.draw();
// 		samp.push(live[index]);
// 		live.splice(index, 1);
// 		currentProbs.splice(index, 1);
// 		sum = currentProbs.reduce(_sum, 0);
// 		currentProbs = currentProbs.map(function(x) {return x/sum; });
// 	    }
// 	    currentProbs = probs;
// 	    live = _rangeFunc(probs.length);
// 	    return samp;
// 	}

// 	result.toString = function() {
// 	    return "Dicrete( [" + 
// 		probs.join(", ") + 
// 		"] )";
// 	};

// 	return result;
//     }

//     function Multinomial(n, probs) {

// 	var result = Object.create(_samplerPrototype),
// 	k = probs.length,
// 	disc = Discrete(probs);

// 	result.draw = function() {
// 	    var draw_result = _fillArrayWithNumber(k, 0),
// 	    i = n;
// 	    while (i--) {
// 		draw_result[disc.draw()] += 1;
// 	    }
// 	    return draw_result;
// 	};

// 	result.toString = function() {
// 	    return "Multinom( " + 
// 		n + 
// 		", [" + probs.join(", ") + 
// 		"] )";
// 	};

// 	return result;
//     }

//     function NegBinomial(r, p) {
// 	var result = Object.create(_samplerPrototype);

// 	result.draw = function() {
// 	    var draw_result = 0, failures = r;
// 	    while (failures) {
// 		Bernoulli(p).draw() ? draw_result++ : failures--;
// 	    }
// 	    return draw_result;
// 	};

// 	result.toString = function() {
// 	    return "NegBinomial( " +  r +
// 		", " + p + " )";
// 	};

// 	return result;
//     }

//     function Poisson(lambda) {
// 	var result = Object.create(_samplerPrototype);

// 	result.draw = function() {
// 	    var draw_result, L = Math.exp(- lambda), k = 0, p = 1;

// 	    do {
// 		k++;
// 		p = p * Math.random()
// 	    } while (p > L);
// 	    return k-1;
// 	}

// 	result.toString = function() {
// 	    return "Poisson( " + lambda + " )";
// 	}

// 	return result;
//     }

//     return {
// 	_fillArrayWithNumber: _fillArrayWithNumber, // REMOVE EVENTUALLY - this is just so the Array.prototype mod can work
// 	_rangeFunc: _rangeFunc,
// 	Bernoulli: Bernoulli,
// 	Binomial: Binomial,
// 	Discrete: Discrete,
// 	Multinomial: Multinomial,
// 	NegBinomial: NegBinomial,
// 	Poisson: Poisson
//     };
// })();

// //*** Sampling from arrays ***//
// // Eventually merge into SJS ???
// function sample_from_array(array, numSamples, withReplacement) {
//     var n = numSamples || 1,
//     result = [],
//     copy,
//     disc,
//     index;

//     if (!withReplacement && numSamples > array.length) {
// 	throw new Error("Sampling without replacement, and the sample size exceeds vector size.")
//     }

//     if (withReplacement) {
// 	while(numSamples--) {
// 	    disc = SJS.Discrete(SJS._fillArrayWithNumber(array.length, 1));
// 	    result.push(array[disc.draw()]);
// 	}
//     } else {
// 	// instead of splicing, consider sampling from an array of possible indices? meh?
// 	copy = array.slice(0);
// 	while (numSamples--) {
// 	    disc = SJS.Discrete(SJS._fillArrayWithNumber(copy.length, 1));
// 	    index = disc.draw();
// 	    result.push(copy[index]);
// 	    copy.splice(index, 1);
// 	    console.log("array: "+copy);
// 	}	
//     }
//     return result;
// }

// ****************************************************************
// ****************************************************************
// ****************************************************************


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
            if (action.payload.value == "categorical") {
                var categoryIdArray = [0, 1]
                var categoryNameArray = ["", ""]
                var categoryProbArray = [0, 0]
                var optsArr = state.colOptsArray.splice(0)
                optsArr[action.payload.id] = {
                    dist: "",
                    categoryIdArray: categoryIdArray,
                    categoryNameArray: categoryNameArray,
                    categoryProbArray, categoryProbArray
                }
                return {
                    ...state,
                    colTypeArray: newArr,
                    colOptsArray: optsArr
                }
            }
            return {
                ...state,
                colTypeArray: newArr
            };
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
                    currentCol++;
                }
            }

            contentType = "application/csv;charset=utf-8;";
            var a = document.createElement('a');
            a.download = "data.csv";
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
