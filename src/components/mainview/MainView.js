import React from 'react';
import {MainViewHeader} from './MainViewHeader';
import TouristService from '../../services/TouristService';
import Util from '../../services/Util';

google.charts.load('current', {'packages':['corechart']});

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            touristInfos: [],
            touristInfosHeader: []
        };
        google.charts.setOnLoadCallback(() => this.renderGoogleTable());
    }

    componentDidMount() {
        let touristInfos = TouristService.getAllTouristInfos();
        touristInfos.then(
            info =>
                this.setState({
                    touristInfos: Util.getResults(info)
                })
        );
        //this.renderGoogleTable();
    }

    componentDidUpdate(){
        this.renderGoogleTable();
    }

    renderGoogleTable(){
        let data = google.visualization.arrayToDataTable(this.state.touristInfos);

        let table = new google.visualization.Table(document.getElementById('table_div'));
        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
    }

    render() {
        return (
            <div className="search-and-overview">
                <MainViewHeader />
                <div className="mid-region">
                    <div className="content">
                        <div className="problem-list">
                            <div id="table_div"></div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}