/**
 * Created by franziskah on 02.11.16.
 */
import Util from './Util';

const ORCHESTER_HEADER = ['Monat', 'Anzahl Besucher'];
const ORCHESTER_TYPES = {
    STAATSORCHESTER: {
        dataName: 'Bayerisches Staatsorchester',
        shownName: 'Staatsorchester'
    },
    PHILHARMONIKER: {
        dataName: 'Mnchner Philharmoniker',
        shownName: 'Philharmoniker'
    }
};

function getRawOrchestersInfos(year) {
    let resource_id = 'ce513fbe-6bbc-479c-8d2a-f9ffc2ae0a20';
    return $.ajax({
        url: Util.getBasicPath(),
        data: {
            resource_id: resource_id,
            q: year
        },
        dataType: 'jsonp',
        cache: true
    });
}

/**
 * Reverses the array, because the months are not in the correct order.
 * Also adds the header.
 * @param array the array to finish for returning the data
 * @returns {*|Array.<T>} finished array
 */
function finishOrchestersArrayData(array) {
    let returnList = array.reverse();
    returnList.unshift(ORCHESTER_HEADER);
    return returnList;
}

module.exports = {
    getOrchestersTypes(){
    return ORCHESTER_TYPES;
    },
    /**
     * @param year the year to return as a string
     * @returns {*|Promise.<TResult>} all available orchesters infos
     */
    getAllOrchesterInfosForGivenYear(year) {
        let returnList = [];
        let staatsOrchester = [];
        let philharmoniker = [];

        return getRawOrchestersInfos(year).then(
            singleInfo => {

                let infos = Util.getResults(singleInfo);
                console.log(infos);
                infos.forEach(element => {
                if(element.ZAHL === 'Besucher/innen'){
                    switch (element.AUSPRAEGUNG) {
                        case ORCHESTER_TYPES.STAATSORCHESTER.dataName :
                            staatsOrchester.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case ORCHESTER_TYPES.PHILHARMONIKER.dataName :
                            philharmoniker.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                    }
                }
                });
                returnList.push(
                    {id: ORCHESTER_TYPES.STAATSORCHESTER.shownName, data: finishOrchestersArrayData(staatsOrchester)},
                    {id: ORCHESTER_TYPES.PHILHARMONIKER.shownName, data: finishOrchestersArrayData(philharmoniker)},
                );
                return returnList;
            }
        )
    }
};
