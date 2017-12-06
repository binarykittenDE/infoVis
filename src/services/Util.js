const BASIC_PATH = 'https://www.opengov-muenchen.de/api/action/datastore_search';
const CHART_TYPES = {
    SCATTER: 'ScatterChart',
    COLUMN: 'ColumnChart'
};

const CHART_HEIGHT = '400px';
const CHART_WIDTH = '1000px';

const MONTHS = {
     JANUARY: 'Januar' ,
     FEBRUARY: 'Februar' ,
     MARCH: 'März' ,
     APRIL: 'April' ,
     MAY: 'Mai' ,
     JUNI: 'Juni' ,
     JULY: 'Juli' ,
     AUGUST: 'August' ,
     SEPTEMBER: 'September' ,
     OCTOBER: 'Oktober' ,
     NOVEMBER: 'November' ,
     DECEMBER: 'Dezember'
};

module.exports = {

    /**
     * @returns {string} the basic path of the REST api
     */
    getBasicPath(){
        return BASIC_PATH
    },

    /**
     * @returns the responses table headers as an array of strings
     */
    getResultHeaders(response){
        return response.result.fields;
    },

    /**
     * @returns the responses table content as an array of objects
     */
    getResults(response){
        return response.result.records;
    },

    /**
     * @returns {{SCATTER: string, COLUMN: string}} the possible chart types as an "enum"
     */
    getChartTypes(){
        return CHART_TYPES
    },

    /**
     * Delete the item from the given list
     * @param array the array to delete the item from
     * @param item the item to delete
     */
    deleteItemFromArray(array, item){
        let modifiedArray = array;
        let indexOfItem = modifiedArray.indexOf(item);
        //If item is found
        if (indexOfItem > -1) {
            modifiedArray.splice(indexOfItem, 1);
        }
        return modifiedArray;
    },

    /**
     * The data sets return months as numbers. An example would be '201706'
     * That means the year 2017, month 06, so Juni.
     *
     * @param monthNumber the month number representation
     * @returns {string} the name of the month in german
     */
    monthNumberToMonthString(monthNumber){
        switch (monthNumber.slice(4, 6)) {
            case '01':
                return MONTHS.JANUARY;
            case '02':
                return MONTHS.FEBRUARY;
            case '03':
                return MONTHS.MARCH;
            case '04':
                return MONTHS.APRIL;
            case '05':
                return MONTHS.MAY;
            case '06':
                return MONTHS.JUNI;
            case '07':
                return MONTHS.JULY;
            case '08':
                return MONTHS.AUGUST;
            case '09':
                return MONTHS.SEPTEMBER;
            case '10':
                return MONTHS.OCTOBER;
            case '11':
                return MONTHS.NOVEMBER;
            case '12':
                return MONTHS.DECEMBER;
        }
    },

    /**
     * @param index the index of the graph entry
     * @returns {*} a hex color code
     */
    getColor(index){
        switch (index) {
            case 1:
                return '#FF4343';
            case 2:
                return '#0078D7';
            case 3:
                return '#498205';
            case 4:
                return '#FFB900';
            case 5:
                return '#881798';
            case 6:
                return '#847645';
            case 7:
                return '#4C4A48';
            case 8:
                return '#00B294';
            case 9:
                return '#F7630C';
            case 10:
                return '#00CC6A';
            case 11:
                return '#EA005E';
            case 12:
                return '#EF6950';
            case 13:
                return '#7A7574';
            case 14:
                return '#C239B3';
            default:
                return '#' + this.getRandomIntLengthSix().toString();
        }
    },

    /**
     * @returns {string} returns the default chart height
     */
    getDefaultChartHeight(){
        return CHART_HEIGHT;
    },

    /**
     * @returns {string} returns the default chart width
     */
    getDefaultChartWidth(){
        return CHART_WIDTH;
    },

    /**
     * @returns {*} a random number with length 6
     */
    getRandomIntLengthSix() {
        return Math.floor(Math.random() * 1000000000);
    },

    deleteDuplicateMonths(listToDeleteDuplicates){
        //Array to hold the month objects
        let januar, february, march, april, may, juni, july, august, september, october, november, december;
        januar = [];
        february = [];
        march = [];
        april = [];
        januar = [];
        may = [];
        juni = [];
        july = [];
        august = [];
        september = [];
        october = [];
        november = [];
        december = [];

        let returnList = [];
        listToDeleteDuplicates.forEach(listEntry => {
            switch (listEntry[0]) {
                case MONTHS.JANUARY:
                    januar = this.compareMonthValuesForMonthList(januar, listEntry);
                    break;
                case MONTHS.FEBRUARY:
                    januar = this.compareMonthValuesForMonthList(february, listEntry);
                    break;
                case MONTHS.MARCH:
                    januar = this.compareMonthValuesForMonthList(march, listEntry);
                    break;
                case MONTHS.APRIL:
                    januar = this.compareMonthValuesForMonthList(april, listEntry);
                    break;
                case MONTHS.MAY:
                    januar = this.compareMonthValuesForMonthList(may, listEntry);
                    break;
                case MONTHS.JUNI:
                    januar = this.compareMonthValuesForMonthList(juni, listEntry);
                    break;
                case MONTHS.JULY:
                    januar = this.compareMonthValuesForMonthList(july, listEntry);
                    break;
                case MONTHS.AUGUST:
                    januar = this.compareMonthValuesForMonthList(august, listEntry);
                    break;
                case MONTHS.SEPTEMBER:
                    januar = this.compareMonthValuesForMonthList(september, listEntry);
                    break;
                case MONTHS.OCTOBER:
                    januar = this.compareMonthValuesForMonthList(october, listEntry);
                    break;
                case MONTHS.NOVEMBER:
                    januar = this.compareMonthValuesForMonthList(november, listEntry);
                    break;
                case MONTHS.DECEMBER:
                    januar = this.compareMonthValuesForMonthList(december, listEntry);
                    break;
            }
            return returnList.concat(januar, february, march, april, may, juni, july, august, september, october, november);
        });
    },

    compareMonthValuesForMonthList(monthArrayToCheck, possibleNewEntryToCompare){
        if (monthArrayToCheck.length < 1) {
            monthArrayToCheck.push(possibleNewEntryToCompare);
            return monthArrayToCheck;
        } else {
            let existingValue = monthArrayToCheck[0];
            if (existingValue[1] < possibleNewEntryToCompare[1]) {
                return [possibleNewEntryToCompare]
            }
        }
    }
};
