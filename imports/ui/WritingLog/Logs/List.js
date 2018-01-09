import {Meteor} from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import React from 'react';
import ReactPaginate from 'react-paginate';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';

import {WritingLogs} from '../../../api/writingLogs';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewLogs: [],
      offset: 0,
      currentLog: '',
      initialPage: 0,
      showingModal: false,
      modalDate: '',
      subscriptions: {
        logs: Meteor.subscribe('writingLogs')
      }
    };
  }
  componentWillUnmount() {
    this.state.subscriptions.logs.stop();
  }
  formatDate(date) {
    let dateString = date.toString();
    let dateArray = dateString.split(' ');

    return `${dateArray[0]}, ${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
  }
  formatModalDate(log) {
    let date = log.createdAt;
    let dateString = date.toString();
    let dateArray = dateString.split(' ');

    return `${dateArray[0]}, ${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
  }
  renderLogs() {
    if (this.props.logs.length > 0) {
      return this.props.logs.slice(this.state.offset, this.state.offset + 4).map((log) => {
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
    } else {
      return <p className="no-logs-text grey-text">No posted logs.</p>;
    }
  }
  renderSecondaryContent(log) {
    if (this.props.selectedUserId == Meteor.userId()) {
      return (
        <a className="secondary-content">
          <i className="delete-btn material-icons red-text text-lighten-3" onClick={() => this.handleDelete(log)}>delete</i>
        </a>
      );
    }
  }
  showPagination() {
    if (this.props.logs.length > 4) {
      return true;
    } else {
      return false;
    }
  }
  handlePageClick(page) {
    this.setState({
      offset: Math.ceil(page.selected * 4)
    });
  }
  handleDelete(log) {
    this.setState({
      currentLog: log,
      showingModal: true,
      modalDate: this.formatModalDate(log)
    });
  }
  confirmDelete() {
    Meteor.call('writingLogs.remove', this.state.currentLog._id, (err) => {
      if (!err) {
        let $msg = $('<span class="green-text text-accent-3">Log Deleted</span>');
        Materialize.toast($msg, 5000, 'rounded');
      } else {
        let $msg = $('<span class="red-text">Error: Log Did Not Delete</span>');
        Materialize.toast($msg, 5000, 'rounded');
      }
    });
    this.handleModalClose();
  }
  handleModalClose() {
    this.setState({
      showingModal: false
    })
  }
  render() {
    let actions = [
      <a className="mui-modal-btn btn-flat red-text waves-effect" onClick={this.confirmDelete.bind(this)}>Delete</a>,
      <a className="mui-modal-btn btn-flat waves-effect" onClick={this.handleModalClose.bind(this)}>Cancel</a>
    ];

    return(
      <span>
        <ul className="collection">
          {this.renderLogs()}
        </ul>
        {
          this.showPagination()
            ? <span className="center-align">
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={<span href="">...</span>}
                  breakClassName={"break-me"}
                  pageCount={this.props.pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                  disableInitialCallback={true}
                  initialPage={this.state.initialPage}
                  onPageChange={this.handlePageClick.bind(this)}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </span>
            : undefined
        }
        <MuiThemeProvider>
          <div>
            <Dialog
              title={'Delete log?'}
              actions={actions}
              modal={false}
              open={this.state.showingModal}
              onRequestClose={this.handleModalClose.bind(this)}
            >
              {
                this.state.currentLog
                  ? <div className="mui-modal">
                      <p className="center-align"><strong>{this.state.currentLog.title}</strong></p>
                      <p className="center-align">Duration: <strong>{this.state.currentLog.hours}</strong> hour(s) and <strong>{this.state.currentLog.minutes}</strong> minutes(s)</p>
                      <p className="center-align">Posted: <strong>{this.state.modalDate}</strong></p>
                    </div>
                  : undefined
              }
            </Dialog>
          </div>
        </MuiThemeProvider>
      </span>
    );
  }
}
