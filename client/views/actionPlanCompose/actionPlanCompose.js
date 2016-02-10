Template['actionPlanCompose'].helpers({
  action_plan: function () {
    var id = Router.current().params._id;
    var ap = ActionPlans.findOne({_id: id});
    Session.set("ap", ap);
    return ap;
  },
  getMilestones: function () {
    var ap = Session.get("ap");
    return Milestones.find({ _id: { $in: ap.milestone_ids } });
  },
  getSubtasks: function () {
    return Subtasks.find({ _id: { $in: this.subtask_ids } });
  }
});

Template['actionPlanCompose'].events({
});
