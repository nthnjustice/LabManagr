import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const WritingLogs = new Mongo.Collection('writingLogs');

if (Meteor.isServer) {
  Meteor.publish('writingLogs', function() {
    return WritingLogs.find(
      {
        owner: Meteor.userId()
      }, {
        sort: {
          createdAt: 1
        }
      }
    );
  });
}

Meteor.methods({
  'writingLogs.insert'(title, hours, minutes, date) {
    const author = `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`;

    WritingLogs.insert({
      title,
      hours,
      minutes,
      owner: Meteor.userId(),
      author: author,
      createdAt: date
    });
  },
  'writingLogs.remove'(id) {
    WritingLogs.remove(id);
  }
});
