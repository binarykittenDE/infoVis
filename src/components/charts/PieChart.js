import React from 'react';
import {Chart} from 'react-google-charts';
import Util from '../../services/Util';

export class PieChart extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="chart">
                { (this.props.data !== undefined && this.props.data.length  > 1 )&&
                <Chart
                    chartType="PieChart"
                    data={this.props.data}
                    options={{title: this.props.title}}
                    graph_id="PieChart"
                    width={Util.getDefaultChartWidth()}
                    height={Util.getDefaultChartHeight()}
                    legend_toggle
                />
                }
                { (this.props.data == undefined || this.props.data.length < 2) &&
                <p>Für dieses Jahr sind keine Daten vorhanden. Bitte wähle ein anderes Jahr aus:</p>
                }
            </div>
        );
    }
}