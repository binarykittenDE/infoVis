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
    }
};
