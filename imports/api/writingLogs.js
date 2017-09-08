import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const WritingLogs = new Mongo.Collection('writingLogs');

if (Meteor.isServer) {
  Meteor.publish('writingLogs', function writingLogPostsPublication() {
    return WritingLogs.find({
      owner: Meteor.userId()
    }, {
      sort: {
        createdAt: 1
      }
    });
  });
}

Meteor.methods({
  'writingLogs.insert'(title, hours, minutes, date) {

    let author = Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName;

    WritingLogs.insert({
      title,
      hours,
      minutes,
      owner: Meteor.userId(),
      author: author,
      createdAt: date
    });
  }
});
