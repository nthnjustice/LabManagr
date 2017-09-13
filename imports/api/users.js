import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

if (Meteor.isServer) {
  Meteor.publish('directory', function() {
    return Meteor.users.find();
  });
}
