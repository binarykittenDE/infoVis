import React from 'react';
import {DefaultHeader} from '../components/DefaultHeader';
import {YearSlider} from '../slider/YearSlider';
import {PieChart} from '../charts/PieChart';
import MainService from '../../services/MainService';
import Util from '../../services/Util';
import {Chart} from 'react-google-charts';

//Todo Pie-Chart??! Prozentanzahl

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            yearToFetch: '2017',
            allDataSetsTotalNumbers: []
        };

    }

    componentDidMount() {
        let allDataSetsTotalNumbers = MainService.getAllDataSetsTotalNumbers(this.state.yearToFetch);
        this.setState({
            allDataSetsTotalNumbers: allDataSetsTotalNumbers
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
                    {this.state.allDataSetsTotalNumbers !== undefined &&
                    <PieChart infos={this.state.allDataSetsTotalNumbers}
                              title="Prozentuale Verteilung der von Touristen genutzten Kulturangebote"/>
                    }
                </div>
                <YearSlider changeYear={this.changeYear}/>
            </div>
        );
    }
}