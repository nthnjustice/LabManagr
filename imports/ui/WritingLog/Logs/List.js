import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactPaginate from 'react-paginate';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewLogs: [],
      offset: 0,
      currLog: '',
      initialPage: 0
    };
  }
  componentDidMount() {
    $('#logs .modal').modal();
  }
  formatDate(date) {
    let str = date.toString();
    let arr = str.split(' ');
    return `${arr[0]}, ${arr[1]} ${arr[2]}, ${arr[3]}`;
  }
  renderLogs() {
    if (this.props.logs.length > 0) {
      let logs = this.props.logs.slice(this.state.offset, this.state.offset + 3).map((log) => {
        return (
          <li key={log._id} className="collection-item">
            <strong>{log.title}</strong>
            <br/>
            Duration: <strong>{log.hours}</strong> hour(s) and <strong>{log.minutes}</strong> minutes(s)
            <br/>
            Posted: <strong>{this.formatDate(log.createdAt)}</strong>
            {this.renderSecondaryContent(log)}
          </li>
        );
      });

      return logs;
    } else {
      return <p className="no-logs-text grey-text">No posted logs.</p>;
    }
  }
  renderSecondaryContent(log) {
    if (this.props.selectedUserId == Meteor.userId()) {
      return (
        <a className="secondary-content">
          <i className="delete-btn material-icons red-text text-lighten-3" onClick={() => {this.onDelete(log);}}>delete</i>
        </a>
      );
    }
  }
  onDelete(log) {
    this.setState({currLog: log});
    $('#logs .modal').modal('open');
  }
  confDelete() {
    Meteor.call('writingLogs.remove', this.state.currLog._id, (err) => {
      $('#logs .modal').modal('close');
      if (!err) {
        let $msg = $('<span class="green-text text-accent-3">Log Deleted</span>');
        Materialize.toast($msg, 5000, 'rounded');
      } else {
        let $msg = $('<span class="red-text">Error: Log Did Not Delete</span>');
        Materialize.toast($msg, 5000, 'rounded');
      }
    });
  }
  showPagination() {
    if (this.props.logs.length > 3) {
      return true;
    } else {
      return false;
    }
  }
  handlePageClick(selected) {
    this.setState({offset: Math.ceil(selected * 3)});
  }
  render() {
    return(
      <span>
        <ul className="collection">
          {this.renderLogs()}
        </ul>
        {
          this.showPagination()
            ? <span className="center-align">
                <ReactPaginate
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={<a href="">...</a>}
                  breakClassName={"break-me"}
                  pageCount={this.props.pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                  disableInitialCallback={true}
                  initialPage={this.state.initialPage}
                  onPageChange={({selected}) => {this.handlePageClick(selected)}}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </span>
            : undefined
        }
        <div className="modal">
          <div className="modal-content">
            <p className="center-align">Delete goal?</p>
            <p className="text center-align">{this.state.currLog.title}</p>
            <p className="center-align">
              <a className="modal-btn btn-flat grey lighten-4 red-text waves-effect" onClick={() => {this.confDelete();}}>Delete</a>
              <a className="modal-btn btn-flat modal-action modal-close grey lighten-4 waves-effect">Cancel</a>
            </p>
          </div>
        </div>
      </span>
    );
  }
}
