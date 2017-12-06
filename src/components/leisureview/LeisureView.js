import React from 'react';
import {DefaultHeader} from '../components/DefaultHeader';
import {YearSlider} from '../slider/YearSlider';
import {ScatterChart} from '../charts/ScatterChart';
import {ColumnChart} from '../charts/ColumnChart';
import LeisureService from '../../services/LeisureService';
import Util from '../../services/Util';
import {Chart} from 'react-google-charts';

const LEISURE_CHART_TITLE = 'Besucherzahlen für Münchens Freizeitmöglichkeiten';

export class LeisureView extends React.Component {
    constructor() {
        super();
        this.state = {
            yearToFetch: '2017',
            leisuresInfos: [],
            leisuresChartData: [],
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
        LeisureService.getAllLeisuresInfosForGivenYear(this.state.yearToFetch).then(leisuresInfos => {
            this.setState({
                leisuresInfos: leisuresInfos,
            });
            return leisuresInfos;
        }).then(leisureInfos => {
            let chartSuitableArray = Util.createMultiDimensionalChartSuitableArray(leisureInfos);
            this.setState({
                leisuresChartData: chartSuitableArray
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
                        {(this.state.leisuresChartData !== undefined && this.state.showScatterChart) &&
                        <ScatterChart data={this.state.leisuresChartData} title={LEISURE_CHART_TITLE}/>
                        }
                        {(this.state.leisuresChartData !== undefined && this.state.showColumnChart) &&
                        <ColumnChart data={this.state.leisuresChartData} title={LEISURE_CHART_TITLE}/>
                        }
                    </div>
                </div>
                <YearSlider changeYear={this.changeYear}/>
            </div>
        );
    }
}