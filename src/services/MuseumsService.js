/**
 * Created by franziskah on 02.11.16.
 */
import Util from './Util';

const MUSEUMS_HEADER = ['Monat', 'Anzahl Besucher'];
const MUSEUM_TYPES = {
    BAYRISCHES_NATIONALMUSEUM: {
        dataName: 'Bayerisches Nationalmuseum',
        shownName: 'Bayerisches Nationalmuseum'
    },
    MUSEUMS_INSEL: {
        dataName: 'Deutsches Museum - Museumsinsel',
        shownName: 'Deutsches Museum - Museumsinsel'
    },
    VERKEHRSZENTRUM: {
        dataName: 'Deutsches Museum - Verkehrszentrum',
        shownName: 'Deutsches Museum - Verkehrszentrum'
    },
    STADTMUSEUM: {
        dataName: 'Mnchner Stadtmuseum',
        shownName: 'Münchner Stadtmuseum'
    },
    MENSCH_UND_NATUR: {
        dataName: 'Museum Mensch und Natur',
        shownName: 'Museum Mensch und Natur'
    },
    GALERIE_IM_LENBACHHAUS: {
        dataName: 'Stdtische Galerie im Lenbachhaus',
        shownName: 'Städtische Galerie im Lenbachhaus'
    },
};

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

/**
 * Reverses the array, because the months are not in the correct order.
 * Also adds the header.
 * @param array the array to finish for returning the data
 * @returns {*|Array.<T>} finished array
 */
function finishMuseumsArrayData(array) {
    let returnList = array.reverse();
    returnList.unshift(MUSEUMS_HEADER);
    return returnList;
}

module.exports = {

    /**
     * @param year the year to return as a string
     * @returns {*|Promise.<TResult>} all available museums infos
     */
    getAllMuseumsInfosForGivenYear(year) {
        let returnList = [];
        let bayrischesNationalmuseum = [];
        let museumsInsel = [];
        let verkehrsZentrum = [];
        let stadtMuseum = [];
        let menschUndNatur = [];
        let galerieImLenbachhaus = [];

        return getRawMuseumsInfos(year).then(
            singleInfo => {

                let infos = Util.getResults(singleInfo);

                infos.forEach(element => {
                    switch (element.AUSPRAEGUNG) {
                        case MUSEUM_TYPES.BAYRISCHES_NATIONALMUSEUM.dataName :
                            bayrischesNationalmuseum.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case MUSEUM_TYPES.MUSEUMS_INSEL.dataName :
                            museumsInsel.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case MUSEUM_TYPES.VERKEHRSZENTRUM.dataName :
                            verkehrsZentrum.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case MUSEUM_TYPES.STADTMUSEUM.dataName :
                            stadtMuseum.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case MUSEUM_TYPES.MENSCH_UND_NATUR.dataName :
                            menschUndNatur.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case MUSEUM_TYPES.GALERIE_IM_LENBACHHAUS.dataName :
                            galerieImLenbachhaus.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                    }
                });
                returnList.push(
                    {id: MUSEUM_TYPES.BAYRISCHES_NATIONALMUSEUM.shownName, data: finishMuseumsArrayData(bayrischesNationalmuseum)},
                    {id: MUSEUM_TYPES.MUSEUMS_INSEL.shownName, data: finishMuseumsArrayData(museumsInsel)},
                    {id: MUSEUM_TYPES.VERKEHRSZENTRUM.shownName, data: finishMuseumsArrayData(verkehrsZentrum)},
                    {id: MUSEUM_TYPES.STADTMUSEUM.shownName, data: finishMuseumsArrayData(stadtMuseum)},
                    {id: MUSEUM_TYPES.MENSCH_UND_NATUR.shownName, data: finishMuseumsArrayData(menschUndNatur)},
                    {id: MUSEUM_TYPES.GALERIE_IM_LENBACHHAUS.shownName, data: finishMuseumsArrayData(galerieImLenbachhaus)}
                );
                return returnList;
            }
        )
    }
};

