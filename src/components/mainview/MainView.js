import React from 'react';
import {MainViewHeader} from './MainViewHeader';
import TouristService from '../../services/TouristService';
import Util from '../../services/Util';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            touristInfos: [],
            touristInfosHeader: []
        };
    }

    componentDidMount() {
        let touristInfos = TouristService.getAllTouristInfos();
        touristInfos.then(
            info =>
                this.setState({
                    touristInfos: Util.getResults(info)
                })
        );
        this.renderGoogleTable();
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

    renderGoogleTable(){
        google.load("visualization", "1", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);

        var drawChart = function(){
            google.setOnLoadCallback(drawChart);
            let data = google.visualization.arrayToDataTable(this.state.touristInfos);

            var table = new google.visualization.Table(document.getElementById('table_div'));
            table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
        }
    }

    renderTable(currentInfo) {
        return <p>{currentInfo.AUSPRAEGUNG}</p>;
    }
}