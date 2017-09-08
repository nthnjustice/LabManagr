import React from 'react';

export default class LoginWrapper extends React.Component {
  render() {
    return(
      <div className="row">
        <div className="col l4 offset-l4">
          <div className="card-panel hoverable">

            <h2 className="center-align cyan-text text-darken-3">LabManagr</h2>
            <div className="divider cyan darken-3"></div>

            <div className="section">
              <h4>Login</h4>
              {this.props.children}
            </div>

          </div>
        </div>
      </div>
    );
  }
}
