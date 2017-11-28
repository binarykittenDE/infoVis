import React from 'react';
import {Chart} from 'react-google-charts';

const chartHeight = '400px';
const chartWidth = '1000px';

export class ScatterChart extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="chart">
                <Chart
                    chartType="ScatterChart"
                    data={this.props.touristInfos}
                    options={{}}
                    graph_id="ScatterChart"
                    width={chartWidth}
                    height={chartHeight}
                    legend_toggle
                />
            </div>
        );
    }
}