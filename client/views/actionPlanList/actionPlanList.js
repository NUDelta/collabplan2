// Template['actionPlanList'].helpers({
//     user_pending_action_plans: function () {
//         return ActionPlans.find({isComplete: false, requester_id: Meteor.userId()}, {sort: { name: 1 }})
//     },
//     user_complete_action_plans: function () {
//         return ActionPlans.find({isComplete: true, requester_id: Meteor.userId()}, {sort: { name: 1 }})
//     },
//     other_pending_action_plans: function () {
//         return ActionPlans.find({isComplete: false, requester_id: {$not: Meteor.userId()}, author_id: { $exists: false }}, {sort: { name: 1 }})
//     },
//     user_working_on_action_plans: function () {
//         return ActionPlans.find({isComplete: false, requester_id: {$not: Meteor.userId()}, author_id: Meteor.userId()}, {sort: { name: 1 }})
//     }
// });

// Template['actionPlanList'].events({
// });
