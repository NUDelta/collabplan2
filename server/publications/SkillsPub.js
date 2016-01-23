Meteor.publish('Skills', function () {
  return Skills.find();
});
