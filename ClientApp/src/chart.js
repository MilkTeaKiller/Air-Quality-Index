import React from 'react';
import { Chart } from "react-google-charts";
import './index.css'

class Chart1 extends React.Component {
    render() {

        return (
            <Chart
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={this.props.data}
                options={{
                    chartArea: {
                        left: '9%',
                    },
                    title: this.props.title,
                    hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
                    vAxis: { minValue: 0 },
                    height: '280px',
                }}
            />
        );
    }
}

class PieChart extends React.Component {
    render() {

        return (
            <Chart
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={this.props.data}
                options={{
                  
                    title: 'Level of AQI under all location found'
                }}
            />
        );
    }
}
export default  Chart1 ;
export { PieChart };