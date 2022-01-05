import { getObjType } from '../utils/util';
import { isRealNum, isRealNull, valueIsError } from './validate';
import { update } from './format';
import formula from './formula';
import dayjs from "dayjs";

const error = {
    v: "#VALUE!",    //錯誤的參數或運算符
    n: "#NAME?",     //公式名稱錯誤
    na: "#N/A",      //函數或公式中沒有可用數值
    r: "#REF!",      //刪除了由其他公式引用的單元格
    d: "#DIV/0!",    //除數是0或空單元格
    nm: "#NUM!",     //當公式或函數中某個數字有問題時
    nl: "#NULL!",    //交叉運算符（空格）使用不正確
    sp: "#SPILL!"    //數組範圍有其它值
}

const func_methods = {
    //單元格數據生成一維數組
    getCellDataArr: function(rangeObj, nullCellType, isNeglectNullCell){
        let dataArr = [];

        if(rangeObj.data == null){
            if(!isNeglectNullCell){
                if(nullCellType === "number"){
                    dataArr.push(0);
                }
                else if(nullCellType === "text"){
                    dataArr.push("");
                }
            }
        }
        else{
            if(getObjType(rangeObj.data) === "array"){
                for(let i = 0; i < rangeObj.data.length; i++){
                    for(let j = 0; j < rangeObj.data[i].length; j++){
                        let cell = rangeObj.data[i][j];
                        let value = cell

                        if(getObjType(cell) === 'object'){
                            value = cell.v
                        }

                        if(value == null ){
                            if(!isNeglectNullCell){
                                if(nullCellType === "number"){
                                    value = 0;
                                }
                                else if(nullCellType === "text"){
                                    value = '';
                                }

                                dataArr.push(value);
                            }
                        }
                        else{
                            dataArr.push(value);
                        }
                    }
                }
            }
            else{
                if(isRealNull(rangeObj.data.v)){
                    if(!isNeglectNullCell){
                        if(nullCellType == "number"){
                            dataArr.push(0);
                        }
                        else if(nullCellType == "text"){
                            dataArr.push("");
                        }
                    }
                }
                else{
                    dataArr.push(rangeObj.data.v);
                }
            }
        }

        return dataArr;
    },
    //單元格數據生成二維數組
    getCellDataDyadicArr: function(rangeObj, nullCellType){
        let dataArr = [];

        if(rangeObj.data == null){
            let rowArr = [];

            if(nullCellType == "number"){
                rowArr.push(0);
            }
            else if(nullCellType == "text"){
                rowArr.push("");
            }

            dataArr.push(rowArr);
        }
        else{
            if(getObjType(rangeObj.data) == "array"){
                for(let i = 0; i < rangeObj.data.length; i++){
                    let rowArr = [];

                    for(let j = 0; j < rangeObj.data[i].length; j++){
                        let cell = rangeObj.data[i][j];
                        let value = cell;

                        if(getObjType(cell) === 'object'){
                            value = cell.v
                        }

                        if(value == null){
                            if(nullCellType === "number"){
                                value = 0;
                            }
                            else if(nullCellType === "text"){
                                value = '';
                            }
                        }

                        rowArr.push(value);
                    }

                    dataArr.push(rowArr);
                }
            }
            else{
                let rowArr = [];

                let value = rangeObj.data.v;

                if(isRealNull(value)){
                    if(nullCellType == "number"){
                        value = 0;
                    }
                    else if(nullCellType == "text"){
                        value = "";
                    }
                }

                rowArr.push(value);

                dataArr.push(rowArr);
            }
        }

        return dataArr;
    },
    //數組數據生成一維數組
    getDataArr: function(arr, isNeglectNaN){
        let dataArr = [];

        if(isNeglectNaN == null){
            isNeglectNaN = false;
        }

        if(getObjType(arr[0]) == "array"){
            for(let i = 0; i < arr.length; i++){
                for(let j = 0; j < arr[i].length; j++){
                    if(isNeglectNaN && !isRealNum(arr[i][j])){
                        continue;
                    }

                    dataArr.push(arr[i][j]);
                }
            }
        }
        else{
            for(let i = 0; i < arr.length; i++){
                if(isNeglectNaN && !isRealNum(arr[i])){
                    continue;
                }

                dataArr.push(arr[i]);
            }
        }

        return dataArr;
    },
    getDataDyadicArr: function(arr){
        let dataArr = [];

        if(getObjType(arr[0]) == "array"){
            for(let i = 0; i < arr.length; i++){
                let rowArr = [];

                for(let j = 0; j < arr[i].length; j++){
                    rowArr.push(arr[i][j]);
                }

                dataArr.push(rowArr);
            }
        }
        else{
            let rowArr = [];

            for(let i = 0; i < arr.length; i++){
                rowArr.push(arr[i]);
            }

            dataArr.push(rowArr);
        }

        return dataArr;
    },
    //是否是規則二維數組
    isDyadicArr: function(arr){
        let isDyadic = true;

        if(arr.length > 1){
            let collen = arr[0].length;

            for(let i = 1; i < arr.length; i++){
                if(arr[i].length != collen){
                    isDyadic = false;
                    break;
                }
            }
        }

        return isDyadic;
    },
    //獲取單個單元格數據，數組第一個值
    getFirstValue: function(data, nullCellType){
        let _this = this;

        if(nullCellType == null){
            nullCellType = "number";
        }

        let value;

        if(getObjType(data) == "array"){
            if(getObjType(data[0]) == "array"){
                if(!_this.isDyadicArr(data)){
                    return error.v;
                }

                value = data[0][0];
            }
            else{
                value = data[0];
            }
        }
        else if(getObjType(data) == "object" && data.startCell != null){
            if(data.data == null){
                if(nullCellType == "number"){
                    value = 0;
                }
                else if(nullCellType == "text"){
                    value = "";
                }
            }
            else{
                let cell_r = window.luckysheetCurrentRow;
                let cell_c = window.luckysheetCurrentColumn;

                if(data.rowl == 1 && data.coll == 1){
                    value = data.data;

                    if(value == null || isRealNull(value.v)){
                        if(nullCellType == "number"){
                            value = 0;
                        }
                        else if(nullCellType == "text"){
                            value = "";
                        }
                    }
                    else{
                        value = value.v;
                    }
                }
                else{
                    if(data.data[0][0].mc != null && data.data[0][0].mc.rs == data.rowl && data.data[0][0].mc.cs == data.coll){
                        value = data.data[0][0];

                        if(value == null || isRealNull(value.v)){
                            if(nullCellType == "number"){
                                value = 0;
                            }
                            else if(nullCellType == "text"){
                                value = "";
                            }
                        }
                        else{
                            value = value.v;
                        }
                    }
                    else if(data.rowl == 1 || data.coll == 1){
                        let cellrange = formula.getcellrange(data.startCell);
                        let str = cellrange.row[0],
                            edr = str + data.rowl - 1,
                            stc = cellrange.column[0],
                            edc = stc + data.coll - 1;

                        if(data.rowl == 1){
                            if(cell_c < stc || cell_c > edc){
                                return error.v;
                            }

                            value = data.data[0][cell_c - stc];
                        }
                        else if(data.coll == 1){
                            if(cell_r < str || cell_r > edr){
                                return error.v;
                            }

                            value = data.data[cell_r - str][0];
                        }

                        if(value == null || isRealNull(value.v) || value.mc != null){
                            if(nullCellType == "number"){
                                value = 0;
                            }
                            else if(nullCellType == "text"){
                                value = "";
                            }
                        }
                        else{
                            value = value.v;
                        }
                    }
                    else{
                        return error.v;
                    }
                }
            }
        }
        else{
            value = data;
        }

        return value;
    },
    //獲取單元格的邏輯值
    getCellBoolen: function(data){
        let _this = this;

        let cumulative = _this.getFirstValue(data);

        if(valueIsError(cumulative)){
            return cumulative;
        }

        if(getObjType(cumulative) == "boolean"){

        }
        else if(getObjType(cumulative) == "string" && (cumulative.toLowerCase() == "true" || cumulative.toLowerCase() == "false")){
            if(cumulative.toLowerCase() == "true"){
                cumulative = true;
            }
            else if(cumulative.toLowerCase() == "false"){
                cumulative = false;
            }
        }
        else if(isRealNum(cumulative)){
            cumulative = parseFloat(cumulative);

            cumulative = cumulative == 0 ? false : true;
        }
        else{
            return error.v;
        }

        return cumulative;
    },
    //獲取單元格的日期
    getCellDate: function(data){
        let _this = this;

        let date_text;

        if(getObjType(data) == "array"){
            if(getObjType(data[0]) == "array"){
                if(!_this.isDyadicArr(data)){
                    return error.v;
                }

                date_text = data[0][0];
            }
            else{
                date_text = data[0];
            }
        }
        else if(getObjType(data) == "object" && data.startCell != null){
            if(data.data == null || getObjType(data.data) == "array" || isRealNull(data.data.v)){
                return error.v;
            }

            date_text = data.data.v;

            if(data.data.ct != null && data.data.ct.t == "d"){
                date_text = update("YYYY-MM-DD h:mm:ss", date_text);
            }
        }
        else{
            date_text = data;
        }

        return date_text;
    },
    getCellrangeDate: function(data){
        let _this = this;

        let date = [];

        if(getObjType(data) == "array"){
            if(getObjType(data[0]) == "array" && !_this.isDyadicArr(data)){
                return error.v;
            }

            date = date.concat(_this.getDataArr(data, false));
        }
        else if(getObjType(data) == "object" && data.startCell != null){
            if(data.data == null){
                date.push(0);
            }
            else{
                if(getObjType(data.data) == "array"){
                    for(let i = 0; i < data.data.length; i++){
                        for(let j = 0; j < data.data[i].length; j++){
                            if(data.data[i][j] != null && !isRealNull(data.data[i][j].v)){
                                let value = data.data[i][j].v;

                                if(data.data[i][j].ct != null && data.data[i][j].ct.t == "d"){
                                    value = update("YYYY-MM-DD h:mm:ss", value);
                                }

                                date.push(value);
                            }
                            else{
                                date.push(0);
                            }
                        }
                    }
                }
                else{
                    let value = data.data.v;

                    if(data.data.ct != null && data.data.ct.t == "d"){
                        value = update("YYYY-MM-DD h:mm:ss", value);
                    }

                    date.push(value);
                }
            }
        }
        else{
            date.push(data);
        }

        return date;
    },
    //獲取正則字符串（處理 . * ? ~* ~?）
    getRegExpStr: function(str){
        return str.replace("~*", "\\*").replace("~?", "\\?").replace(".", "\\.").replace("*", ".*").replace("?", ".");
    },
    //階乘
    factorial: function(num){
        if (num == 0 || num == 1) {
            return 1;
        }
        else {
            return (num * this.factorial(num - 1));
        }
    },
    //雙階乘
    factorialDouble: function(num){
        if (num <= 0) {
            return 1;
        }
        else {
            return (num * this.factorialDouble(num - 2));
        }
    },
    //總體方差
    variance: function(num_arr){
        let sum = 0, count = 0;

        for(let i = 0; i < num_arr.length; i++){
            let number = num_arr[i];

            sum += number;
            count++;
        }

        let avg = sum / count;

        let sum_variance = 0;

        for(let j = 0; j < num_arr.length; j++){
            let number = num_arr[j];

            sum_variance += (number - avg) * (number - avg);
        }

        return sum_variance / count;
    },
    //樣本方差
    variance_s: function(num_arr){
        let sum = 0, count = 0;

        for(let i = 0; i < num_arr.length; i++){
            let number = num_arr[i];

            sum += number;
            count++;
        }

        let avg = sum / count;

        let sum_variance = 0;

        for(let j = 0; j < num_arr.length; j++){
            let number = num_arr[j];

            sum_variance += (number - avg) * (number - avg);
        }

        return sum_variance / (count - 1);
    },
    //總體標準偏差
    standardDeviation: function(num_arr){
        let sum = 0, count = 0;

        for(let i = 0; i < num_arr.length; i++){
            let number = num_arr[i];

            sum += number;
            count++;
        }

        let avg = sum / count;

        let sum_variance = 0;

        for(let j = 0; j < num_arr.length; j++){
            let number = num_arr[j];

            sum_variance += (number - avg) * (number - avg);
        }

        return Math.sqrt(sum_variance / count);
    },
    //樣本標準偏差
    standardDeviation_s: function(num_arr){
        let sum = 0, count = 0;

        for(let i = 0; i < num_arr.length; i++){
            let number = num_arr[i];

            sum += number;
            count++;
        }

        let avg = sum / count;

        let sum_variance = 0;

        for(let j = 0; j < num_arr.length; j++){
            let number = num_arr[j];

            sum_variance += (number - avg) * (number - avg);
        }

        return Math.sqrt(sum_variance / (count - 1));
    },
    //是否是閏年
    isLeapYear: function(year){
        return new Date(year, 1, 29).getMonth() === 1;
    },
    //2月是否有29
    feb29Between: function(date1, date2){
        let _this = this;

        let year1 = dayjs(date1).year();
        let mar1year1 = dayjs().set({ 'year': year1, 'month': 2, 'date': 1 });

        if (_this.isLeapYear(year1) && dayjs(date1) < dayjs(mar1year1) && dayjs(date2) >= dayjs(mar1year1)) {
            return true;
        }

        let year2 = dayjs(date2).year();
        let mar1year2 = dayjs().set({ 'year': year2, 'month': 2, 'date': 1 });

        return (_this.isLeapYear(year2) && dayjs(date2) >= dayjs(mar1year2) && dayjs(date1) < dayjs(mar1year2));
    },
    //SQL 查詢
    findResultIndex: function(database, criterias){
        let matches = {};

        for (let i = 1; i < database[0].length; ++i) {
            matches[i] = true;
        }

        let maxCriteriaLength = criterias[0].length;

        for (i = 1; i < criterias.length; ++i) {
            if (criterias[i].length > maxCriteriaLength) {
                maxCriteriaLength = criterias[i].length;
            }
        }

        for (let k = 1; k < database.length; ++k) {
            for (let l = 1; l < database[k].length; ++l) {
                let currentCriteriaResult = false;
                let hasMatchingCriteria   = false;

                for (let j = 0; j < criterias.length; ++j) {
                    let criteria = criterias[j];

                    if (criteria.length < maxCriteriaLength) {
                        continue;
                    }

                    let criteriaField = criteria[0];

                    if (database[k][0] !== criteriaField) {
                        continue;
                    }

                    hasMatchingCriteria = true;

                    for (let p = 1; p < criteria.length; ++p) {
                        currentCriteriaResult = currentCriteriaResult || (new Function("return " + database[k][l] + criteria[p])());  // jshint ignore:line
                    }
                }

                if (hasMatchingCriteria) {
                    matches[l] = matches[l] && currentCriteriaResult;
                }
            }
        }

        let result = [];

        for (let n = 0; n < database[0].length; ++n) {
            if (matches[n]) {
                result.push(n - 1);
            }
        }

        return result;
    },
    findField: function(database, title){
        let index = null;

        for (let i = 0; i < database.length; i++) {
            if (database[i][0] == title) {
                index = i;
                break;
            }
        }

        if (index == null) {
            return error.v;
        }

        return index;
    },
    rest: function(array, idx){
        idx = idx || 1;

        if (!array || typeof array.slice !== 'function') {
            return array;
        }

        return array.slice(idx);
    },
    compact: function(array){
        if (!array) {
            return array;
        }

        let result = [];

        for (let i = 0; i < array.length; ++i) {
            if (!array[i]) {
                continue;
            }

            result.push(array[i]);
        }

        return result;
    }
}

export default func_methods;
