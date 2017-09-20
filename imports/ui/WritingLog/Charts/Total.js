import React from 'react';
import {Chart} from 'react-google-charts';

export default class Total extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Total',
        titlePosition: 'center',
        hAxis: {
          title: '',
          minValue: 0,
          maxValue: 7
        },
        vAxis: {
          title: 'Minutes',
          minValue: 0,
          maxValue: 120
        },
        legend: 'none',
      }
    };
  }
  dataLoaded() {
    if (this.props.data && this.props.data.length > 1) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return(
      <span id="total">
        {
          this.dataLoaded() ?
            <Chart
              chartType="ScatterChart"
              data={this.props.data}
              options={this.state.options}
              width="100%"
              height="190px"
              legend_toggle
            />
          : undefined
        }
      </span>
    );
  }
}
