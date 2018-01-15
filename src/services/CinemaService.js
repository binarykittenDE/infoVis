/**
 * Created by franziskah on 02.11.16.
 */
import Util from './Util';

const CINEMA_HEADER = ['Monat', 'Anzahl Besucher'];

function getRawCinemaInfos(year) {
    let resource_id = 'ca564678-4049-4a99-9e0d-b16806557476';
    return $.ajax({
        url: Util.getBasicPath(),
        data: {
            limit: Util.getLimitForDataFetching(),
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
     * @returns {*|Promise.<TResult>}  the total visitor number of all cinemas for the given year
     */
    getCinemaInfosTotalVisitorNumber(year){
        return getRawCinemaInfos(year).then(
            singleInfo => {
                let returnNumber = 0;
                let infos = Util.getResults(singleInfo);

                infos.forEach(element => {
                    if(element.WERT !== null && element.WERT !== '' && element.AUSPRAEGUNG == 'insgesamt'){
                        returnNumber += parseInt(element.WERT);
                    }
                });
                return returnNumber;
            });
    },

    /**
     * @param year the year to return as a string
     * @returns {*|Promise.<TResult>} all available cinema infos sorted into the different cinema types data sets
     */
    getAllCinemaInfosForGivenYear(year) {
        let returnList = [];

        return getRawCinemaInfos(year).then(
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
            returnList.unshift(CINEMA_HEADER);
            return returnList;
        });
    }
};

