/**
 * Created by franziskah on 02.11.16.
 */
import Util from './Util';

const LEISURES_HEADER = ['Monat', 'Anzahl Besucher'];
const LEISURE_TYPES = {
    OLYMPIAPARK_AUSSEN: {
        dataName: 'Außenanlagen Olympiapark (Veranstaltungen)',
        shownName: 'Außenanlagen Olympiapark (Veranstaltungen)'
    },
    KLEINE_OLYMPIAHALLE: {
        dataName: 'Kleine Olympiahalle',
        shownName: 'Kleine Olympiahalle'
    },
    OLYMPIA_EISSPORTZENTRUM: {
        dataName: 'Olympia-Eissportzentrum',
        shownName: 'Olympia-Eissportzentrum'
    },
    OLYMPIAHALLE: {
        dataName: 'Olympiahalle',
        shownName: 'Olympiahalle'
    },
    OLYMPIASTADION: {
        dataName: 'Olympiastadion',
        shownName: 'Olympiastadion'
    },
    OLYMPIATURM: {
        dataName: 'Olympiaturm',
        shownName: 'Olympiaturm'
    },
    TIERPARK: {
        dataName: 'Tierpark Hellabrunn',
        shownName: 'Tierpark Hellabrunn'
    },
};

function getRawLeisuresInfos(year) {
    let resource_id = 'a5e6f0f9-8428-44a2-8f03-57d88c9ce6bc';
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
function finishLeisuresArrayData(array) {
    let returnList = array.reverse();
    returnList.unshift(LEISURES_HEADER);
    return returnList;
}

module.exports = {
    getLeisuresTypes(){
    return LEISURE_TYPES;
    },
    /**
     * @param year the year to return as a string
     * @returns {*|Promise.<TResult>} all available leisures infos
     */
    getAllLeisuresInfosForGivenYear(year) {
        let returnList = [];
        let olympiaparkAussen = [];
        let kleineOlympiahalle = [];
        let eissportZentrum = [];
        let olympiaHalle = [];
        let olympiaStadion = [];
        let olympiaTurm = [];
        let tierPark = [];

        return getRawLeisuresInfos(year).then(
            singleInfo => {

                let infos = Util.getResults(singleInfo);

                infos.forEach(element => {
                    switch (element.AUSPRAEGUNG) {
                        case LEISURE_TYPES.OLYMPIAPARK_AUSSEN.dataName :
                            olympiaparkAussen.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case LEISURE_TYPES.KLEINE_OLYMPIAHALLE.dataName :
                            kleineOlympiahalle.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case LEISURE_TYPES.OLYMPIA_EISSPORTZENTRUM.dataName :
                            eissportZentrum.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case LEISURE_TYPES.OLYMPIAHALLE.dataName :
                            olympiaHalle.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case LEISURE_TYPES.OLYMPIASTADION.dataName :
                            olympiaStadion.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case LEISURE_TYPES.OLYMPIATURM.dataName :
                            olympiaTurm.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case LEISURE_TYPES.TIERPARK.dataName :
                            tierPark.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                    }
                });
                returnList.push(
                    {id: LEISURE_TYPES.OLYMPIAPARK_AUSSEN.shownName, data: finishLeisuresArrayData(olympiaparkAussen)},
                    {id: LEISURE_TYPES.KLEINE_OLYMPIAHALLE.shownName, data: finishLeisuresArrayData(kleineOlympiahalle)},
                    {id: LEISURE_TYPES.OLYMPIA_EISSPORTZENTRUM.shownName, data: finishLeisuresArrayData(eissportZentrum)},
                    {id: LEISURE_TYPES.OLYMPIAHALLE.shownName, data: finishLeisuresArrayData(olympiaHalle)},
                    {id: LEISURE_TYPES.OLYMPIASTADION.shownName, data: finishLeisuresArrayData(olympiaStadion)},
                    {id: LEISURE_TYPES.OLYMPIATURM.shownName, data: finishLeisuresArrayData(olympiaTurm)},
                    {id: LEISURE_TYPES.TIERPARK.shownName, data: finishLeisuresArrayData(tierPark)},
                );
                return returnList;
            }
        )
    }
};

