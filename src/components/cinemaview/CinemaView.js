import React from 'react';
import {DefaultHeader} from '../components/DefaultHeader';
import {YearSlider} from '../slider/YearSlider';
import {LineChart} from '../charts/LineChart';
import {ColumnChart} from '../charts/ColumnChart';
import CinemaService from '../../services/CinemaService';
import Util from '../../services/Util';
import {Chart} from 'react-google-charts';

const CINEMA_CHART_TITLE = 'Anzahl Kinobesucher pro Monat in München';

export class CinemaView extends React.Component {
    constructor() {
        super();
        this.state = {
            yearToFetch: '2017',
            cinemaInfos: [],
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
        CinemaService.getAllCinemaInfosForGivenYear(yearToFetch).then(cinemaInfos => {
            this.setState({
                cinemaInfos: cinemaInfos
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
                        {(this.state.cinemaInfos !== undefined && this.state.showScatterChart) &&
                        <LineChart data={this.state.cinemaInfos} title={CINEMA_CHART_TITLE}/>
                        }
                        {(this.state.cinemaInfos !== undefined && this.state.showColumnChart) &&
                        <ColumnChart data={this.state.cinemaInfos} title={CINEMA_CHART_TITLE}/>
                        }
                </div>
                <YearSlider changeYear={this.changeYear}/>
            </div>
        );
    }
}