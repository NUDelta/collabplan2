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


function updateMilestoneIds(ap_id) {
  var milestoneIds = [];

  $('._id', '.milestone_list').each(function() {
    milestoneIds.push($(this).text());
  });

  Meteor.call('action_plan_reorder_milestones', ap_id, milestoneIds, function (err) {
    if (!err) {
      console.log('action plan updated');
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