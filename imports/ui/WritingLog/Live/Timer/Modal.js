import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';

import Form from './Form';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingModal: this.props.showModal
    };
  }
  handleClose() {
    this.props.closeModal(false);
  }
  render() {
    let actions = [
      <a className="mui-modal-btn btn-flat red-text waves-effect" onClick={() => {this.handleClose()}}>Close</a>
    ];

    return(
      <MuiThemeProvider>
        <div>
          <Dialog
            title={"Time's Up!"}
            actions={actions}
            modal={false}
            open={this.props.showModal}
            onRequestClose={this.handleClose.bind(this)}
          >
            <p className="grey-text"><strong>Submit this log when you are ready.</strong></p>
            <p className="grey-text">(The timer is still running.)</p>
            <Form time={this.props.time} closeModal={this.handleClose.bind(this)}/>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}
