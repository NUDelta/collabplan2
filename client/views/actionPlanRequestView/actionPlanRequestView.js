Template['actionPlanRequestView'].helpers({
    action_plan: function () {
        var id = Router.current().params._id;
        return ActionPlans.findOne({_id: id});
    },
    author_name: function(id) {
        return Meteor.users.findOne({_id: id});
    }
});

Template['actionPlanRequestView'].events({
});
