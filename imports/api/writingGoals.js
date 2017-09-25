import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const WritingGoals = new Mongo.Collection('writingGoals');

if (Meteor.isServer) {
  Meteor.publish('writingGoals', function() {
    return WritingGoals.find();
  });
}

Meteor.methods({
  'writingGoals.insert'(desc, date) {
    let author = `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`;

    WritingGoals.insert({
      description: desc,
      deadline: date,
      active: true,
      author,
      owner: Meteor.userId(),
      createdAt: new Date()
    });
  },
  'writingGoals.remove'(id) {
    WritingGoals.remove(id);
  },
  'writingGoals.setAchieved'(id) {
    WritingGoals.update(id,
      {
        $set: {
          active: false
        }
      }
    );
  },
  'writingGoals.setActive'(id) {
    WritingGoals.update(id,
      {
        $set: {
          active: true
        }
      }
    );
  }
});
