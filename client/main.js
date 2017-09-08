import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';

import {routes, onAuthChange} from '../imports/routes/routes';

function orderAssets() {
  const link = [
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/css/materialize.min.css'
  ];
  const headFirstChild = document.querySelector('head').firstChild;

  $.each(link, function(i, val) {
    let styleTag = document.createElement('link');

    styleTag.setAttribute('rel', 'stylesheet');
    styleTag.setAttribute('href', val);

    document.querySelector('head').insertBefore(styleTag, headFirstChild);
  });

  return true;
}

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  if (orderAssets()) {
    ReactDOM.render(routes, document.getElementById('app'));
  }
});
