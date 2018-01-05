/**
 * Created by franziskah on 02.11.16.
 */
import MuseumsService from './MuseumsService';
import CinemaService from './CinemaService';
import LeisureService from './LeisureService';
import OrchestersService from './OrchestersService';
import TheatersService from './TheatersService';

module.exports = {


    getAllDataSetsTotalNumbers(year) {
        let museumsPromise = MuseumsService.getMuseumInfosTotalVisitorNumber(year).then(totalNumber => {
            return (['Museen', totalNumber])
        });

        let cinemaPromise = CinemaService.getCinemaInfosTotalVisitorNumber(year).then(totalNumber => {
            return (['Kinos', totalNumber])
        });

        let leisurePromise = LeisureService.getLeisuresInfosTotalVisitorNumber(year).then(totalNumber => {
            return (['Freizeitangebote', totalNumber])
        });

        let orchesterPromise = OrchestersService.getOrchesterInfosTotalVisitorNumber(year).then(totalNumber => {
            return (['Orchester', totalNumber])
        });

        let theaterPromise = TheatersService.geTheaterInfosTotalVisitorNumber(year).then(totalNumber => {
            return (['Theater', totalNumber])
        });

        return Promise.all([museumsPromise, cinemaPromise, leisurePromise, orchesterPromise, theaterPromise]).then(
            returnData => {
                return [['Typ', 'Anzahl']].concat(returnData);
            }
        );
    }
};

