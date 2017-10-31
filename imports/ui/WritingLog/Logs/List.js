import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactPaginate from 'react-paginate';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewLogs: [],
      offset: 0,
      currLog: '',
      initialPage: 0,
      showingModal: false
    };
  }
  formatDate(date) {
    let str = date.toString();
    let arr = str.split(' ');

    return `${arr[0]}, ${arr[1]} ${arr[2]}, ${arr[3]}`;
  }
  formatDateModal() {
    if (this.state.currLog) {
      let date = this.state.currLog.createdAt;
      let str = date.toString();
      let arr = str.split(' ');

      return `${arr[0]}, ${arr[1]} ${arr[2]}, ${arr[3]}`;
    }
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
          <i className="delete-btn material-icons red-text text-lighten-3" onClick={() => this.onDelete(log)}>delete</i>
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
  handlePageClick(selected) {
    this.setState({offset: Math.ceil(selected * 4)});
  }
  onDelete(log) {
    this.setState({currLog: log});
    this.setState({showingModal: true});
  }
  confDelete() {
    Meteor.call('writingLogs.remove', this.state.currLog._id, (err) => {
      this.handleClose();
      if (!err) {
        let $msg = $('<span class="green-text text-accent-3">Log Deleted</span>');
        Materialize.toast($msg, 5000, 'rounded');
      } else {
        let $msg = $('<span class="red-text">Error: Log Did Not Delete</span>');
        Materialize.toast($msg, 5000, 'rounded');
      }
    });
  }
  handleClose() {
    this.setState({showingModal: false})
  }
  render() {
    let actions = [
      <a className="mui-modal-btn btn-flat red-text waves-effect" onClick={() => {this.confDelete()}}>Delete</a>,
      <a className="mui-modal-btn btn-flat waves-effect" onClick={() => {this.handleClose()}}>Cancel</a>
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
        <MuiThemeProvider>
          <div>
            <Dialog
              title={'Delete log?'}
              actions={actions}
              modal={false}
              open={this.state.showingModal}
              onRequestClose={this.handleClose.bind(this)}
            >
              {
                this.state.currLog
                  ? <div className="mui-modal">
                      <p className="center-align"><strong>{this.state.currLog.title}</strong></p>
                      <p className="center-align">
                        Duration: <strong>{this.state.currLog.hours}</strong> hour(s) and <strong>{this.state.currLog.minutes}</strong> minutes(s)
                      </p>
                      <p className="center-align">Posted: <strong>{this.formatDateModal()}</strong></p>
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
