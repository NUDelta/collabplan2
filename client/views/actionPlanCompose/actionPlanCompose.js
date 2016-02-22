Template['actionPlanCompose'].helpers({
  action_plan: function () {
    var id = Router.current().params._id;
    var ap = ActionPlans.findOne({_id: id});
    Session.set("ap", ap);
    return ap;
  },
  getMilestones: function () {
    var ap = Session.get("ap");
    var milestones = ap.milestone_ids;
    var db = Milestones.find({ _id: { $in: milestones } }).fetch();

    for (var i = 0; i < milestones.length; ++i) {
      var c = db.filter(function(o) { return o._id == milestones[i] })[0];
      milestones[i] = c;
    }
    
    return milestones;
  },
  getSubtasks: function () {
    return Subtasks.find({ _id: { $in: this.subtask_ids } });
  }
});

Template['actionPlanCompose'].events({
});

Template['actionPlanCompose'].onRendered(function () {
  Sortable.create(milestoneList, { 
    onUpdate: function (event) {
      updateMilestoneIds();
    }
  });
});

function updateMilestoneIds() {
  var milestoneIds = [];
  var actionPlanId = Session.get("ap")._id;

  $('._id', '#milestoneList').each(function() {
    milestoneIds.push($(this).text());
  });

  Meteor.call('action_plan_reorder_milestones', actionPlanId, milestoneIds, function (err) {
    if (!err) {
      console.log('action plan updated');
    }
  });
}

