import React from 'react';
import {Chart} from 'react-google-charts';
import Util from '../../services/Util';

export class ScatterChart extends React.Component {
    constructor() {
        super();
    }

    render() {
        {
            console.log('arriving data in ScatterChart Component:');
            console.log(this.props.data)
        }
        return (
            <div className="chart">
                <Chart
                    chartType="ScatterChart"
                    data={this.props.data}
                    options={{title: this.props.title}}
                    graph_id="ScatterChart"
                    width={Util.getDefaultChartWidth()}
                    height={Util.getDefaultChartHeight()}
                    legend_toggle
                />
            </div>
        );
    }
}