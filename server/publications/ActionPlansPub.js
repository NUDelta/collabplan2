Meteor.publish('ActionPlans', function () {
  return ActionPlans.find();
});

Meteor.publish('ActionPlansById', function (id) {
  return ActionPlans.find({_id: id});
});