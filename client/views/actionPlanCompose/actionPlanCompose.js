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
  last_save: function(){
    var last_save = new Date(Session.get('last_save') || this.modifiedAt);
    return moment(last_save).format('MM/DD/YY, h:mm:ss a');
  },
  mode: function(){
    return Session.get('mode') || 'recipes';
  }
});

Template['actionPlanCompose'].events({
  // 'click #request_info_btn': function(){
  //   console.log(this);
  //   Modal.show('requestInfoModal', this)
  // },
  'click #ap_submit': function(events){
    console.log(this);
    event.preventDefault();
    if (!confirm('Are you sure you want to submit? You cannot edit the action plan after submission.'))
      return;

    var actionPlan = {
      _id: this._id,
      isComplete: true
    };

    Meteor.call('action_plan_edit', actionPlan, function (err) {
      if (!err) {
        Router.go('action_plans.show', {_id: this._id})
      }
    });
  },
  'click .mode_toggle': function(event){
    var mode = event.target.dataset.val;
    Session.set('mode',mode);
  },
  'click #reset': function(event){
    if (!confirm('Are you sure you want to reset? This will delete all milestones and subtasks.'))
      return;

    var id = Router.current().params._id;

    Meteor.call('action_plan_reset', id, function (err) {
      if (!err) {
        Session.set('mode', 'recipes');
      }
    });
  },
});

Template['actionPlanCompose'].onRendered(function(){
  Session.set('selected_milestone_id', null);
})


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
