Template['actionPlanCompose'].helpers({
    action_plan: function () {
        var id = Router.current().params._id;
        return ActionPlans.findOne({_id: id});
    }
});

Template['actionPlanCompose'].events({
});
