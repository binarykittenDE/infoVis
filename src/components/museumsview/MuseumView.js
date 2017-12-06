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
            museumsChartData: [],
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
            this.setState({
                museumsInfos: museumsInfos,
            });
            return museumsInfos;
        }).then(museumInfos => {
            let museumsChartData = [
                ['Monat'],
                [Util.MONTHS.JANUARY],
                [Util.MONTHS.FEBRUARY],
                [Util.MONTHS.MARCH],
                [Util.MONTHS.APRIL],
                [Util.MONTHS.MAY],
                [Util.MONTHS.JUNI],
                [Util.MONTHS.JULY],
                [Util.MONTHS.AUGUST],
                [Util.MONTHS.SEPTEMBER],
                [Util.MONTHS.OCTOBER],
                [Util.MONTHS.NOVEMBER],
                [Util.MONTHS.DECEMBER],
            ];
            museumInfos.forEach(info => {
                museumsChartData[0].push(info.id);
                info.data[1] !== undefined && museumsChartData[1].push(info.data[1][1]) || museumsChartData[1].push(0);
                info.data[2] !== undefined && museumsChartData[2].push(info.data[2][1]) || museumsChartData[2].push(0);
                info.data[3] !== undefined && museumsChartData[3].push(info.data[3][1]) || museumsChartData[3].push(0);
                info.data[4] !== undefined && museumsChartData[4].push(info.data[4][1]) || museumsChartData[4].push(0);
                info.data[5] !== undefined && museumsChartData[5].push(info.data[5][1]) || museumsChartData[5].push(0);
                info.data[6] !== undefined && museumsChartData[6].push(info.data[6][1]) || museumsChartData[6].push(0);
                info.data[7] !== undefined && museumsChartData[7].push(info.data[7][1]) || museumsChartData[7].push(0);
                info.data[8] !== undefined && museumsChartData[8].push(info.data[8][1]) || museumsChartData[8].push(0);
                info.data[9] !== undefined && museumsChartData[9].push(info.data[9][1]) || museumsChartData[9].push(0);
                info.data[10] !== undefined && museumsChartData[10].push(info.data[10][1]) || museumsChartData[10].push(0);
                info.data[11] !== undefined && museumsChartData[11].push(info.data[11][1]) || museumsChartData[11].push(0);
                info.data[12] !== undefined && museumsChartData[12].push(info.data[12][1]) || museumsChartData[12].push(0);
            });
            this.setState({
                museumsChartData: museumsChartData
            });
        });
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
                <YearSlider/>
            </div>
        );
    }
}