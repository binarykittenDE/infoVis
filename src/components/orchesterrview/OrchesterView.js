import React from 'react';
import {DefaultHeader} from '../components/DefaultHeader';
import {YearSlider} from '../slider/YearSlider';
import {LineChart} from '../charts/LineChart';
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

    componentDidMount(givenYearToFetch) {
        let yearToFetch = this.state.yearToFetch;
        if(givenYearToFetch){
            yearToFetch = givenYearToFetch;
        }

        OrchestersService.getAllOrchesterInfosForGivenYear(yearToFetch).then(orchestersInfos => {
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
        this.componentDidMount(yearToSet);
        this.render();
    }

    render() {
        return (
            <div className="main-view">
                <DefaultHeader chartToShow={this.showChart}/>
                <div className="mid-region">
                        {(this.state.orchestersChartData !== undefined && this.state.showScatterChart) &&
                        <LineChart data={this.state.orchestersChartData} title={ORCHESTER_CHART_TITLE}/>
                        }
                        {(this.state.orchestersChartData !== undefined && this.state.showColumnChart) &&
                        <ColumnChart data={this.state.orchestersChartData} title={ORCHESTER_CHART_TITLE}/>
                        }
                </div>
                <YearSlider changeYear={this.changeYear}/>
            </div>
        );
    }
}