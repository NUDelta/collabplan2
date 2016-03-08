Template['actionPlanCompose'].helpers({
  action_plan: function () {
    var id = Router.current().params._id;
    var ap = ActionPlans.findOne({_id: id});
    Session.set("ap", ap);
    return ActionPlans.findOne({_id: id});
  },
  request_user: function () {
    var ap = Session.get("ap");
    var requester_id = ap.requester_id;
    return Meteor.users.findOne({_id: requester_id});
  },
  getMilestones: function () {    
    var ap = Session.get("ap");
    var milestones = ap.milestone_ids;
    var db = Milestones.find({ _id: { $in: milestones } }).fetch();

    // milestones need to be in the order of the milestone_ids array
    // as of 3/7/16, there is no way to do this with a Mongo query
    // http://stackoverflow.com/questions/3142260/order-of-responses-to-mongodb-in-query
    for (var i = 0; i < milestones.length; ++i) {
      var c = db.filter(function(o) { return o._id === milestones[i] })[0];
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
      changesSaved();
    }
  });
}

var timeout;
function changesSaved() {
  window.clearTimeout(timeout);
  $('#changes-saved').show();
  timeout = window.setTimeout(function (){
    $('#changes-saved').fadeOut(500);
  }, 5000)
}