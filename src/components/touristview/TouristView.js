import React from 'react';
import {DefaultHeader} from '../components/DefaultHeader';
import {YearSlider} from '../slider/YearSlider';
import {ScatterChart} from '../charts/ScatterChart';
import {ColumnChart} from '../charts/ColumnChart';
import TouristService from '../../services/TouristService';
import Util from '../../services/Util';
import {Chart} from 'react-google-charts';

const TOURIST_CHART_TITLE = 'Anzahl Touristen pro Monat in München';

export class TouristView extends React.Component {
    constructor() {
        super();
        this.state = {
            yearToFetch: '2017',
            touristInfos: [],
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
        TouristService.getAllTouristInfosForGivenYear(this.state.yearToFetch).then(touristInfos => {
            this.setState({
                touristInfos: touristInfos
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
                        {(this.state.touristInfos !== undefined && this.state.showScatterChart) &&
                        <ScatterChart data={this.state.touristInfos} title={TOURIST_CHART_TITLE}/>
                        }
                        {(this.state.touristInfos !== undefined && this.state.showColumnChart) &&
                        <ColumnChart data={this.state.touristInfos} title={TOURIST_CHART_TITLE}/>
                        }
                    </div>
                </div>
                <YearSlider changeYear={this.changeYear}/>
            </div>
        );
    }
}