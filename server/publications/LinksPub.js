Meteor.publish('Links', function () {
  return Links.find();
});
