Template['actionPlanCompose'].helpers({
  action_plan: function () {
    var id = Router.current().params._id;
    var ap = ActionPlans.findOne({_id: id});
    Session.set("ap", ap);
    return ap;
  }
});

Template['actionPlanCompose'].events({
});
