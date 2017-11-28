/**
 * Created by franziskah on 02.11.16.
 */
import Util from './Util';

function getRawMuseumsInfos(year) {
    let resource_id = '6c6a809e-91ee-4f3e-9268-a8b7bc38311c';
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
     * @returns {*|Promise.<TResult>} all available museum infos (only PINAKOTHEK in there!!)
     */
    getAllMuseumsInfosForGivenYear(year) {
        let returnList = [];

        getRawMuseumsInfos(year).then(
            singleInfo => {
                let infos = Util.getResults(singleInfo);

                returnList.push(['Monat', 'Anzahl Besucher']);

                infos.forEach(element => {
                    returnList.push([
                        Util.monthNumberToMonthString(element.MONAT),
                        parseInt(element.WERT)
                    ])
                });
            }
        );

        return returnList;
    }
};

