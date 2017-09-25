import React from 'react';
import {Chart} from 'react-google-charts';

export default class Week extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Past 7 Days',
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
    if (this.props.data) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return(
      <span id="week">
        {
          this.dataLoaded()
            ?
              <Chart
                chartType="ColumnChart"
                data={this.props.data}
                options={this.state.options}
                width="100%"
                height="165px"
                legend_toggle
              />
            : undefined
        }
      </span>
    );
  }
}
