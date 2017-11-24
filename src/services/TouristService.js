/**
 * Created by franziskah on 02.11.16.
 */
import StorageService from "./StorageService";
import Util from './Util';

module.exports = {

    /**
     * @param year the year to return as a string
     * @returns {*|Promise.<TResult>} all available tourist infos
     */
    getAllTouristInfosForGivenYear(year) {
        let resource_id = '4f00274a-ef75-41e5-b5c1-15f22c9f8a12';
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
};

