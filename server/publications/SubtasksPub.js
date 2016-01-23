Meteor.publish('Subtasks', function () {
  return Subtasks.find();
});
