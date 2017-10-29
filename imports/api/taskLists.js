import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const TaskLists = new Mongo.Collection('taskLists');

if (Meteor.isServer) {
  Meteor.publish('taskLists', function() {
    return TaskLists.find();
  });
}

Meteor.methods({
  'taskLists.insert'(title) {
    let author = `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`;

    TaskLists.insert({
      title,
      author,
      owner: Meteor.userId(),
      createdAt: new Date()
    });
  },
  'taskLists.remove'(id) {
    TaskLists.remove(id);
  }
});
