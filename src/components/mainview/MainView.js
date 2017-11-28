import React from 'react';
import {MainViewHeader} from './MainViewHeader';
import TouristService from '../../services/TouristService';
import Util from '../../services/Util';
import {PieChart, Pie, Tooltip, Cell} from 'recharts';


export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            touristInfos: [],
            touristInfosHeader: [],
            graphUsableTouristInfos: []
        };
    }

    componentDidMount() {
        let touristInfos = TouristService.getAllTouristInfosForGivenYear('2017');
        touristInfos.then(
            info => {
                let touristInfos = Util.getResults(info);
                let graphUsableTouristInfos = [];

                touristInfos.forEach(element => {
                    if (element.AUSPRAEGUNG == 'insgesamt') {
                        console.log(element);
                        graphUsableTouristInfos.push({
                            name: Util.monthNumberToMonthString(element.MONAT),
                            value: parseInt(element.WERT)
                        })
                    }
                });

                this.setState({
                    graphUsableTouristInfos: graphUsableTouristInfos,
                    touristInfos: touristInfos
                })
            }
        );
    }

    render() {
        return (
            <div className="main-view">
                <MainViewHeader />
                <div className="mid-region">
                    <div className="chart">
                        <PieChart width={800} height={400}>
                            <Pie data={this.state.graphUsableTouristInfos} cx={200} cy={200} outerRadius={170}
                                 fill="#8884d8" label>
                                { //Map a color per entry
                                    this.state.graphUsableTouristInfos.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={Util.getColor(index)}/>
                                    ))
                                }
                            </Pie>
                            <Tooltip/>
                        </PieChart>
                    </div>
                </div>
            </div>
        );
    }
}