import React from 'react';
import {DefaultHeader} from '../components/DefaultHeader';
import {YearSlider} from '../slider/YearSlider';
import {PieChart} from '../charts/PieChart';
import MainService from '../../services/MainService';
import {Chart} from 'react-google-charts';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            yearToFetch: '2017',
            allDataSetsTotalNumbers: []
        };
        this.changeYear = this.changeYear.bind(this);
    }

    componentDidMount() {
        MainService.getAllDataSetsTotalNumbers(this.state.yearToFetch).then(allDataSetsTotalNumbers => {
            this.setState({
                allDataSetsTotalNumbers: allDataSetsTotalNumbers
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
                <div className="mid-region">
                    {this.state.allDataSetsTotalNumbers !== undefined &&
                    <PieChart data={this.state.allDataSetsTotalNumbers}
                              title="Prozentuale Verteilung der genutzten Kulturangebote"
                              height="480px"/>
                    }
                </div>
                <YearSlider changeYear={this.changeYear}/>
            </div>
        );
    }
}