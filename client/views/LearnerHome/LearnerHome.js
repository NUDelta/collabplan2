Template['LearnerHome'].helpers({
	user_pending_action_plans: function () {
        return ActionPlans.find({isComplete: false, requester_id: Meteor.userId()}, {sort: { name: 1 }})
    },
    user_complete_action_plans: function () {
        return ActionPlans.find({isComplete: true, requester_id: Meteor.userId()}, {sort: { name: 1 }})
    },
});

Template['LearnerHome'].events({
});
