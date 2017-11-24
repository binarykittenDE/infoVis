/**
 * Created by franziskah on 02.11.16.
 */
import StorageService from "./StorageService";
import Util from './Util';

module.exports = {

    /**
     * @returns {*|Promise.<TResult>} all available tourist infos
     */
    getAllTouristInfos() {
        let resource_id = '4f00274a-ef75-41e5-b5c1-15f22c9f8a12';
        return $.ajax({
            url: Util.getBasicPath(),
            data: {
                resource_id: resource_id,
                limit: 10
            },
            dataType: 'jsonp',
            cache: true
        });
    }
};

