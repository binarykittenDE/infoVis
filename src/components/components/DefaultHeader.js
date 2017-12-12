import React from 'react';
import Util from '../../services/Util';

//todo Ein kleines Fragezeichen einfügen, das wenn man darauf klickt ein Overlay zeigt, wo erklärt wird dass man
// Linien aus/undschalten kann wenn man drauf klickt usw
// todo: reset button um alle Linien wieder einzuschalten

export class DefaultHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLine: true,
            isColumn: false
        };

        this.handleLineChange = this.handleLineChange.bind(this);
        this.handleColumnChange = this.handleColumnChange.bind(this);
    }

    handleLineChange() {
        let isLine = !(this.state.isLine);
        this.setState({
            isLine: isLine,
            isColumn: !isLine
        });
        this.props.chartToShow(Util.getChartTypes().SCATTER); //Call the handed method
    }

    handleColumnChange() {
        let isColumn = !(this.state.isColumn);
        this.setState({
            isColumn: isColumn,
            isLine: !isColumn
        });
        this.props.chartToShow(Util.getChartTypes().COLUMN); //Call the handed method
    }

    render() {
        return (
            <div className="header">
                   <div className="chart-type-toggler">
                       <h3>Darstellungsform:</h3>
                       <label>Liniendiagramm
                           <input type="radio" checked={this.state.isLine} onChange={this.handleLineChange}/></label>
                       <label>Säulendiagramm
                           <input type="radio" checked={this.state.isColumn} onChange={this.handleColumnChange}/></label>
                   </div>
            </div>
        );
    }
}

