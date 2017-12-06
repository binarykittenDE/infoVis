/**
 * Created by franziskah on 02.11.16.
 */
import Util from './Util';
import TouristService from './TouristService';
import MuseumsService from './MuseumsService';

module.exports = {


    getAllInfos(year) {
        let returnList = [];
        returnList.push('Monat', 'Anzahl Touristen', 'Besucher Pinakothek');

        let touristInfos = TouristService.getAllTouristInfosForGivenYear(year);
        let museumsInfos = MuseumsService.getAllMuseumsInfosForGivenYear(year);

        //Joine die Listen zusammen. Am besten nach Monat sortiert


        return returnList;
    }
};

