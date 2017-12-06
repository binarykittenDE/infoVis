import React from 'react';
import {DefaultHeader} from '../components/DefaultHeader';
import {YearSlider} from '../slider/YearSlider';
import {ScatterChart} from '../charts/ScatterChart';
import {ColumnChart} from '../charts/ColumnChart';
import TheatersService from '../../services/TheatersService';
import Util from '../../services/Util';
import {Chart} from 'react-google-charts';

const THEATER_CHART_TITLE = 'Besucherzahlen für Münchens Theater';

export class TheaterView extends React.Component {
    constructor() {
        super();
        this.state = {
            yearToFetch: '2017',
            theatersInfos: [],
            theatersChartData: [],
            showScatterChart: true,
            showColumnChart: false
        };
        this.showChart = this.showChart.bind(this);
        this.changeYear = this.changeYear.bind(this);
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
        TheatersService.getAllTheaterInfosForGivenYear(this.state.yearToFetch).then(theatersInfos => {
            this.setState({
                theatersInfos: theatersInfos,
            });
            return theatersInfos;
        }).then(theaterInfos => {
            let chartSuitableArray = Util.createMultiDimensionalChartSuitableArray(theaterInfos);
            this.setState({
                theatersChartData: chartSuitableArray
            });
        });
    }

    changeYear(yearToSet) {
        this.setState({
            yearToFetch: yearToSet
        });
        this.componentDidMount();
        this.render();
    }

    render() {
        return (
            <div className="main-view">
                <DefaultHeader chartToShow={this.showChart}/>
                <div className="mid-region">
                    <div className="chart">
                        {(this.state.theatersChartData !== undefined && this.state.showScatterChart) &&
                        <ScatterChart data={this.state.theatersChartData} title={THEATER_CHART_TITLE}/>
                        }
                        {(this.state.theatersChartData !== undefined && this.state.showColumnChart) &&
                        <ColumnChart data={this.state.theatersChartData} title={THEATER_CHART_TITLE}/>
                        }
                    </div>
                </div>
                <YearSlider changeYear={this.changeYear}/>
            </div>
        );
    }
}