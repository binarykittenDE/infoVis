/**
 * Created by franziskah on 02.11.16.
 */
import Util from './Util';

const TOURIST_HEADER = ['Monat', 'Anzahl Touristen'];

function getRawTouristInfos(year) {
    let resource_id = '4f00274a-ef75-41e5-b5c1-15f22c9f8a12';
    return $.ajax({
        limit: Util.getLimitForDataFetching(),
        url: Util.getBasicPath(),
        data: {
            resource_id: resource_id,
            q: year
        },
        dataType: 'jsonp',
        cache: true
    });
}

module.exports = {

    /**
     * @param year the year to fetch the data for
     * @returns {*|Promise.<TResult>}  the total visitor number of all tourists for the given year
     */
    getTouristInfosTotalVisitorNumber(year){
        return getRawTouristInfos(year).then(
            singleInfo => {
                let returnNumber = 0;
                let infos = Util.getResults(singleInfo);

                infos.forEach(element => {
                    if(element.WERT !== null && element.WERT !== ''){
                        returnNumber += parseInt(element.WERT);
                    }
                });
                return returnNumber;
            });
    },

    /**
     * @param year the year to return as a string
     * @returns {*|Promise.<TResult>} all available tourist infos
     */
    getAllTouristInfosForGivenYear(year) {
        let returnList = [];

        return getRawTouristInfos(year).then(
            singleInfo => {
                let infos = Util.getResults(singleInfo);

                infos.forEach(element => {
                    if (element.AUSPRAEGUNG == 'insgesamt') {
                        returnList.push([
                            Util.monthNumberToMonthString(element.MONAT),
                            parseInt(element.WERT)
                        ])
                    }
                });
                return returnList;
            }
        ).then(infos => {
            let returnList = Util.deleteDuplicateMonths(infos);
            returnList.unshift(TOURIST_HEADER);
            return returnList;
        });
    }
};

