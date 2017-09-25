import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import ReactDOM from 'react-dom';

import {routes, onAuthChange} from '../imports/routes/routes';

function orderAssets() {
  const links = [
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/css/materialize.min.css'
  ];
  let firstChild = $('head link').first();

  links.map(link => {
    let tag = $('<link/>');

    tag.attr('rel', 'stylesheet');
    tag.attr('href', link);

    firstChild.before(tag);
  });

  return true;
}

Tracker.autorun(() => {
  let isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  if (orderAssets()) {
    ReactDOM.render(routes, document.getElementById('root'));
  }
});
