import React, { Component } from 'react';
import { VictoryPie, VictoryTheme, VictoryChart, VictoryBar } from 'victory';
class BarGraph extends Component {
    state = {}
    render() {


        return (
            <div>


                <VictoryPie
                    padAngle={({ datum }) => datum.y}
                    innerRadius={100}
                    // colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                    data={[
                        { x: 1, y: 5, label: "One" },
                        { x: 2, y: 4, label: "Two" },
                        { x: 3, y: 2, label: "Two" },
                        { x: 4, y: 3, label: "Two" },
                        { x: 5, y: 1, label: "Two" }
                    ]}
                />



                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={{ x: 10 }}
                >
                    <VictoryBar horizontal
                        style={{
                            data: { fill: "#c43a31" }
                        }}
                        data={[
                            { x: 1, y: 5, label: "One" },
                            { x: 2, y: 4, label: "Two" },
                            { x: 3, y: 2, label: "Two" },
                            { x: 4, y: 3, label: "Two" },
                            { x: 5, y: 1, label: "Two" }
                        ]}
                    />
                </VictoryChart>
            </div>
        );
    }
}

export default BarGraph;