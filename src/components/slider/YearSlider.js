import React from 'react';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

let labels = {
    0: '2009',
    1: '2010',
    2: '2011',
    3: '2012',
    4: '2013',
    5: '2014',
    6: '2015',
    7: '2016',
    8: '2017'
};

export class YearSlider extends React.Component {
    constructor() {
        super();
        this.state = {
            pickedYear: 8
        };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(value) {
        this.props.changeYear(labels[value]);
        this.setState({
            pickedYear: value
        })
    }

    render() {
        let { pickedYear } = this.state;
        return (
            <div className="year-slider">
                <Slider
                    value={pickedYear}
                    orientation="horizontal"
                    onChange={this.handleOnChange}
                    labels={labels}
                    tooltip={true}
                    min={0}
                    max={8}
                    step={1}
                />
            </div>
        );
    }
}

