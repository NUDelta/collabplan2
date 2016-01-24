Template['actionPlanList'].helpers({
    user_pending_action_plans: function () {
        return ActionPlans.find({isComplete: false, requester_id: Meteor.userId()})
    },
    user_complete_action_plans: function () {
        return ActionPlans.find({isComplete: true, requester_id: Meteor.userId()})
    },
    other_pending_action_plans: function () {
        return ActionPlans.find({isComplete: false, requester_id: {$not: Meteor.userId()}})
    }
});

Template['actionPlanList'].events({
});
