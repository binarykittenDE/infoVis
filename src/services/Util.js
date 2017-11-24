const BASIC_PATH = 'https://www.opengov-muenchen.de/api/action/datastore_search';

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
                return 'Januar';
            case '02':
                return 'Februar';
            case '03':
                return 'März';
            case '04':
                return 'April';
            case '05':
                return 'Mai';
            case '06':
                return 'Juni';
            case '07':
                return 'Juli';
            case '08':
                return 'August';
            case '09':
                return 'September';
            case '10':
                return 'Oktober';
            case '11':
                return 'November';
            case '12':
                return 'Dezember';
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
     * @returns {*} a random number with length 6
     */
    getRandomIntLengthSix() {
        return Math.floor(Math.random() * 1000000000);
    }
};
