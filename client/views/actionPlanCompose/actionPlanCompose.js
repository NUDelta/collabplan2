Template['actionPlanCompose'].helpers({
  action_plan: function () {
    var id = Router.current().params._id;
    return ActionPlans.findOne({_id: id});
  },
  selected_milestone: function(){
    return Milestones.findOne({_id: Session.get('selected_milestone_id') || this.milestone_ids[0]});
  },
  request_user: function () {
    return Meteor.users.findOne({_id: this.requester_id});
  },
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
  var actionPlanId = Session.get("current_ap")._id;

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