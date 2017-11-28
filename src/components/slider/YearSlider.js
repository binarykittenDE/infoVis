import React from 'react';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

export class YearSlider extends React.Component {
    constructor() {
        super();
        this.state = {
            volume: 2
        };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(value) {
        this.setState({
            volume: value
        })
    }

    render() {
        let labels = {
            0: '2015',
            1: '2016',
            2: '2017'
        };
        let { volume } = this.state;
        return (
            <div className="year-slider">
                <Slider
                    value={volume}
                    orientation="horizontal"
                    onChange={this.handleOnChange}
                    labels={labels}
                    tooltip={true}
                    min={0}
                    max={2}
                    step={1}
                />
            </div>
        );
    }
}

