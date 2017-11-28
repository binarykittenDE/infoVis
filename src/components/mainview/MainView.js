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
            touristInfosHeader: [],
            touristInfos: [],
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
        let touristInfos = TouristService.getAllTouristInfosForGivenYear('2017');
        this.setState({
            touristInfos: touristInfos
        })
    }

    render() {
        return (
            <div className="main-view">
                <MainViewHeader chartToShow={this.showChart}/>
                <div className="mid-region">
                    <div className="chart">
                        {this.state.showScatterChart &&
                        <ScatterChart touristInfos={this.state.touristInfos}/>
                        }
                        {this.state.showColumnChart &&
                        <ColumnChart touristInfos={this.state.touristInfos}/>
                        }
                    </div>
                </div>
                <YearSlider/>
            </div>
        );
    }
}