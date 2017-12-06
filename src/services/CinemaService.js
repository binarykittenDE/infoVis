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
            resource_id: resource_id,
            q: year
        },
        dataType: 'jsonp',
        cache: true
    });
}

module.exports = {

    /**
     * @param year the year to return as a string
     * @returns {*|Promise.<TResult>} all available cinema infos
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

