import React from 'react';
import {DefaultHeader} from '../components/DefaultHeader';
import {YearSlider} from '../slider/YearSlider';
import {ScatterChart} from '../charts/ScatterChart';
import {ColumnChart} from '../charts/ColumnChart';
import MuseumsService from '../../services/MuseumsService';
import Util from '../../services/Util';
import {Chart} from 'react-google-charts';

const MUSEUM_CHART_TITLE = 'Besucherzahlen für Münchens Museen';

export class MuseumView extends React.Component {
    constructor() {
        super();
        this.state = {
            yearToFetch: '2017',
            museumsInfos: [],
            museumsChartData: [],
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
        MuseumsService.getAllMuseumsInfosForGivenYear(this.state.yearToFetch).then(museumsInfos => {
            this.setState({
                museumsInfos: museumsInfos,
            });
            return museumsInfos;
        }).then(museumInfos => {
            let chartSuitableArray = Util.createMultiDimensionalChartSuitableArray(museumInfos);
            this.setState({
                museumsChartData: chartSuitableArray
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
                        {(this.state.museumsChartData !== undefined && this.state.showScatterChart) &&
                        <ScatterChart data={this.state.museumsChartData} title={MUSEUM_CHART_TITLE}/>
                        }
                        {(this.state.museumsChartData !== undefined && this.state.showColumnChart) &&
                        <ColumnChart data={this.state.museumsChartData} title={MUSEUM_CHART_TITLE}/>
                        }
                    </div>
                </div>
                <YearSlider changeYear={this.changeYear}/>
            </div>
        );
    }
}