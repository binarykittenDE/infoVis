import React from 'react';
import {Chart} from 'react-google-charts';
import Util from '../../services/Util';

export class ColumnChart extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="chart">
                <Chart
                    chartType="ColumnChart"
                    data={this.props.touristInfos}
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