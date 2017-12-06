import React from 'react';
import Util from '../../services/Util';

export class TouristViewHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isScatter: true,
            isColumn: false
        };

        this.handleScatterChange = this.handleScatterChange.bind(this);
        this.handleColumnChange = this.handleColumnChange.bind(this);
    }

    handleScatterChange() {
        let isScatter = !(this.state.isScatter);
        this.setState({
            isScatter: isScatter,
            isColumn: !isScatter
        });
        this.props.chartToShow(Util.getChartTypes().SCATTER); //Call the handed method
    }

    handleColumnChange() {
        let isColumn = !(this.state.isColumn);
        this.setState({
            isColumn: isColumn,
            isScatter: !isColumn
        });
        this.props.chartToShow(Util.getChartTypes().COLUMN); //Call the handed method
    }

    render() {
        return (
            <div className="header">
                   <div className="chart-type-toggler">
                       <h3>Darstellungsform:</h3>
                       <label>Scatter-Chart
                           <input type="radio" checked={this.state.isScatter} onChange={this.handleScatterChange}/></label>
                       <label>Column-Chart
                           <input type="radio" checked={this.state.isColumn} onChange={this.handleColumnChange}/></label>
                   </div>
            </div>
        );
    }
}

