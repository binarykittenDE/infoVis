import React from 'react';
import {DefaultHeader} from '../components/DefaultHeader';
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
        });
    }

    render() {
        return (
            <div className="main-view">
                <DefaultHeader chartToShow={this.showChart}/>
                <div className="mid-region">
                    <div className="chart">
                        {(this.state.touristInfos !== undefined && this.state.showScatterChart) &&
                        <ScatterChart infos={this.state.touristInfos} title="Anzahl Touristen pro Monat in München"/>
                        }
                        {(this.state.touristInfos !== undefined && this.state.showColumnChart) &&
                        <ColumnChart infos={this.state.touristInfos} title="Anzahl Touristen pro Monat in München"/>
                        }
                    </div>
                </div>
                <YearSlider/>
            </div>
        );
    }
}