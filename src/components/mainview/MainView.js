import React from 'react';
import {MainViewHeader} from './MainViewHeader';
import {YearSlider} from '../slider/YearSlider';
import {ScatterChart} from '../charts/ScatterChart';
import {ColumnChart} from '../charts/ColumnChart';
import TouristService from '../../services/TouristService';
import Util from '../../services/Util';
import {Chart} from 'react-google-charts';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            touristInfos: [],
            touristInfosHeader: [],
            graphUsableTouristInfos: []
        };
    }

    componentDidMount() {
        let touristInfos = TouristService.getAllTouristInfosForGivenYear('2017');
        touristInfos.then(
            info => {
                let touristInfos = Util.getResults(info);
                let graphUsableTouristInfos = [];
                graphUsableTouristInfos.push(['Monat', 'Anzahl Touristen']);

                touristInfos.forEach(element => {
                    if (element.AUSPRAEGUNG == 'insgesamt') {
                        console.log(element);
                        graphUsableTouristInfos.push([
                            Util.monthNumberToMonthString(element.MONAT),
                            parseInt(element.WERT)
                        ])
                    }
                });

                this.setState({
                    graphUsableTouristInfos: graphUsableTouristInfos,
                    touristInfos: touristInfos
                })
            }
        );
    }

    render() {
        return (
            <div className="main-view">
                <MainViewHeader />
                <div className="mid-region">
                    <div className="chart">
                        <ColumnChart touristInfos={this.state.graphUsableTouristInfos}/>
                    </div>
                </div>
                <YearSlider/>
            </div>
        );
    }
}