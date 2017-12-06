import React from 'react';
import {MainViewHeader} from './MainViewHeader';
import {YearSlider} from '../slider/YearSlider';
import {ScatterChart} from '../charts/ScatterChart';
import {ColumnChart} from '../charts/ColumnChart';
import TouristService from '../../services/TouristService';
import MuseumsService from '../../services/MuseumsService';
import Util from '../../services/Util';
import {Chart} from 'react-google-charts';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            touristInfos: [],
            museumsInfos: [],
            showScatterChart: true,
            showColumnChart: false
        };
        this.showChart = this.showChart.bind(this);
    }

    showChart(chartToShow) {
        switch (chartToShow) {
            case Util.getChartTypes().COLUMN:
                this.setState({
                    showScatterChart: false,
                    showColumnChart: true
                });
                break;
            case Util.getChartTypes().SCATTER:
                this.setState({
                    showScatterChart: true,
                    showColumnChart: false
                });
                break;
        }
    }

    componentDidMount() {
        TouristService.getAllTouristInfosForGivenYear('2017').then(touristInfos => {
            this.setState({
                touristInfos: touristInfos
            });
        })
    }

    render() {
        return (
            <div className="main-view">
                <MainViewHeader chartToShow={this.showChart}/>
                <div className="mid-region">
                    <div className="chart">
                        {this.state.showScatterChart &&
                        <ScatterChart touristInfos={this.state.museumsInfos}/>
                        }
                        {this.state.showColumnChart &&
                        <ColumnChart touristInfos={this.state.museumsInfos}/>
                        }
                    </div>
                </div>
                <YearSlider/>
            </div>
        );
    }
}