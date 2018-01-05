/**
 * Created by franziskah on 02.11.16.
 */
import Util from './Util';
import TouristService from './TouristService';
import MuseumsService from './MuseumsService';
import CinemaService from './CinemaService';
import LeisureService from './LeisureService';
import OrchestersService from './OrchestersService';
import TheatersService from './TheatersService';

module.exports = {


    getAllDataSetsTotalNumbers(year) {
        //How much percent of the tourists? rechne...
        let returnList = [['Typ', 'Anzahl']];

        MuseumsService.getMuseumInfosTotalVisitorNumber(year).then(totalNumber => {
            returnList.push(['Museen', totalNumber])
        });

        CinemaService.getCinemaInfosTotalVisitorNumber(year).then(totalNumber => {
            returnList.push(['Kinos', totalNumber])
        });

        LeisureService.getLeisuresInfosTotalVisitorNumber(year).then(totalNumber => {
            returnList.push(['Freizeitangebote', totalNumber])
        });

        OrchestersService.getOrchesterInfosTotalVisitorNumber(year).then(totalNumber => {
            returnList.push(['Orchester', totalNumber])
        });

        TheatersService.geTheaterInfosTotalVisitorNumber(year).then(totalNumber => {
            returnList.push(['Theater', totalNumber])
        });

        return returnList;
    }
};

