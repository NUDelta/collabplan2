Meteor.publish('ActionPlans', function () {
  return ActionPlans.find();
});
