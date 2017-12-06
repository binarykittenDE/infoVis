/**
 * Created by franziskah on 02.11.16.
 */
import Util from './Util';

const THEATER_HEADER = ['Monat', 'Anzahl Besucher'];
const THEATER_TYPES = {
    KAMMERSPIELE: {
        dataName: 'Münchner Kammerspiele (Kammer 1)',
        shownName: 'Kammerspiele (Kammer 1)'
    },
    NATIONALTHEATER: {
        dataName: 'Nationaltheater',
        shownName: 'Nationaltheater'
    },
    PRINZREGENTENTHEATER: {
        dataName: 'Prinzregententheater (Großes Haus)',
        shownName: 'Prinzregententheater (Großes Haus)'
    },
    RESIDENZTHEATER: {
        dataName: 'Residenztheater',
        shownName: 'Residenztheater'
    },
    SCHAUBURG_THEATER_DER_JUGEND: {
        dataName: 'Schauburg - Theater der Jugend',
        shownName: 'Schauburg - Theater der Jugend'
    },
    GAERTNERPLATZ: {
        dataName: 'Theater am Gärtnerplatz',
        shownName: 'Gärtnerplatz'
    },

};

function getRawTheatersInfos(year) {
    let resource_id = 'eb734a10-3b0a-4421-ae1d-4226f9409538';
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
function finishTheatersArrayData(array) {
    let returnList = array.reverse();
    returnList.unshift(THEATER_HEADER);
    return returnList;
}

module.exports = {
    getTheatersTypes(){
    return THEATER_TYPES;
    },
    /**
     * @param year the year to return as a string
     * @returns {*|Promise.<TResult>} all available theaters infos
     */
    getAllTheaterInfosForGivenYear(year) {
        let returnList = [];
        let bayrischesNationaltheater = [];
        let theatersInsel = [];
        let verkehrsZentrum = [];
        let stadtTheater = [];
        let menschUndNatur = [];
        let galerieImLenbachhaus = [];

        return getRawTheatersInfos(year).then(
            singleInfo => {

                let infos = Util.getResults(singleInfo);
                console.log(infos);
                infos.forEach(element => {
                if(element.ZAHL === 'Besucher/innen'){
                    switch (element.AUSPRAEGUNG) {
                        case THEATER_TYPES.KAMMERSPIELE.dataName :
                            bayrischesNationaltheater.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case THEATER_TYPES.NATIONALTHEATER.dataName :
                            theatersInsel.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case THEATER_TYPES.PRINZREGENTENTHEATER.dataName :
                            verkehrsZentrum.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case THEATER_TYPES.RESIDENZTHEATER.dataName :
                            stadtTheater.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case THEATER_TYPES.SCHAUBURG_THEATER_DER_JUGEND.dataName :
                            menschUndNatur.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                        case THEATER_TYPES.GAERTNERPLATZ.dataName :
                            galerieImLenbachhaus.push(
                                [Util.monthNumberToMonthString(element.MONAT),
                                    parseInt(element.WERT)]);
                            break;
                    }
                }
                });
                returnList.push(
                    {
                        id: THEATER_TYPES.KAMMERSPIELE.shownName,
                        data: finishTheatersArrayData(bayrischesNationaltheater)
                    },
                    {id: THEATER_TYPES.NATIONALTHEATER.shownName, data: finishTheatersArrayData(theatersInsel)},
                    {id: THEATER_TYPES.PRINZREGENTENTHEATER.shownName, data: finishTheatersArrayData(verkehrsZentrum)},
                    {id: THEATER_TYPES.RESIDENZTHEATER.shownName, data: finishTheatersArrayData(stadtTheater)},
                    {id: THEATER_TYPES.SCHAUBURG_THEATER_DER_JUGEND.shownName, data: finishTheatersArrayData(menschUndNatur)},
                    {
                        id: THEATER_TYPES.GAERTNERPLATZ.shownName,
                        data: finishTheatersArrayData(galerieImLenbachhaus)
                    }
                );
                return returnList;
            }
        )
    }
};

