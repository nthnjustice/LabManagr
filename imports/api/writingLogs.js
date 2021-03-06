import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const WritingLogs = new Mongo.Collection('writingLogs');

if (Meteor.isServer) {
  Meteor.publish('writingLogs', function() {
    return WritingLogs.find();
  });
}

Meteor.methods({
  'writingLogs.insert'(title, hours, minutes, date) {
    WritingLogs.insert({
      title,
      hours,
      minutes,
      author: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
      owner: Meteor.userId(),
      createdAt: date
    });
  },
  'writingLogs.remove'(id) {
    WritingLogs.remove(id);
  }
});
