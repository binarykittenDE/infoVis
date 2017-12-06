import React from 'react';
import {DefaultHeader} from '../components/DefaultHeader';
import {YearSlider} from '../slider/YearSlider';
import {ScatterChart} from '../charts/ScatterChart';
import {ColumnChart} from '../charts/ColumnChart';
import OrchestersService from '../../services/OrchestersService';
import Util from '../../services/Util';
import {Chart} from 'react-google-charts';

const ORCHESTER_CHART_TITLE = 'Besucherzahlen für Münchens Orchester';

export class OrchesterView extends React.Component {
    constructor() {
        super();
        this.state = {
            yearToFetch: '2017',
            orchestersInfos: [],
            orchestersChartData: [],
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
        OrchestersService.getAllOrchesterInfosForGivenYear(this.state.yearToFetch).then(orchestersInfos => {
            this.setState({
                orchestersInfos: orchestersInfos,
            });
            return orchestersInfos;
        }).then(orchesterInfos => {
            let chartSuitableArray = Util.createMultiDimensionalChartSuitableArray(orchesterInfos);
            this.setState({
                orchestersChartData: chartSuitableArray
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
                        {(this.state.orchestersChartData !== undefined && this.state.showScatterChart) &&
                        <ScatterChart data={this.state.orchestersChartData} title={ORCHESTER_CHART_TITLE}/>
                        }
                        {(this.state.orchestersChartData !== undefined && this.state.showColumnChart) &&
                        <ColumnChart data={this.state.orchestersChartData} title={ORCHESTER_CHART_TITLE}/>
                        }
                    </div>
                </div>
                <YearSlider changeYear={this.changeYear}/>
            </div>
        );
    }
}