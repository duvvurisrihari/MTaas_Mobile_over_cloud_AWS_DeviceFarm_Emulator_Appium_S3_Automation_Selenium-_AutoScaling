import React, { Component } from 'react';
import { VictoryLabel, VictoryTooltip } from 'victory';

class CustomLabel extends Component {
    state = {}
    render() {
        return (
            <div>
                <g>
                    {/* <VictoryLabel {...this.props} /> */}
                    <VictoryTooltip
                        {...this.props}
                        x={200} y={250}
                        orientation="top"
                        pointerLength={0}
                        cornerRadius={50}
                        flyoutWidth={100}
                        flyoutHeight={100}
                        flyoutStyle={{ fill: "black" }}
                    />
                </g>
            </div>
        );
    }
}
CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

export default CustomLabel;