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
        MuseumsService.getAllMuseumsInfosForGivenYear('2017').then(museumsInfos => {
            console.log(museumsInfos[0].data);
            let test = museumsInfos[0].data;
            this.setState({
                museumsInfos: test
            });
        })
    }

    render() {
        return (
            <div className="main-view">
                <DefaultHeader chartToShow={this.showChart}/>
                <div className="mid-region">
                    <div className="chart">
                        {(this.state.museumsInfos !== undefined && this.state.showScatterChart) &&
                        <ScatterChart touristInfos={this.state.museumsInfos} title={MUSEUM_CHART_TITLE}/>
                        }
                        {(this.state.museumsInfos !== undefined && this.state.showColumnChart) &&
                        <ColumnChart touristInfos={this.state.museumsInfos} title={MUSEUM_CHART_TITLE}/>
                        }
                    </div>
                </div>
                <YearSlider/>
            </div>
        );
    }
}