Template['milestoneList'].helpers({
	get_milestone: function (id) {
    return Milestones.findOne({_id: id});
  },
  getSubtasks: function () {
    return Subtasks.find({ _id: { $in: this.subtask_ids } });
  }
});

Template['milestoneList'].events({
  'click .milestone_tile': function() {
    Session.set('selected_milestone_id', this._id)
  }
});

Template['milestoneList'].onRendered(function () {
  var ap_id = this.data._id;
  Sortable.create(milestoneList, { 
    onUpdate: function (event) {
      updateMilestoneIds(ap_id);
    }
  });
});

function updateMilestoneIds(ap_id) {
  var milestoneIds = [];

  $('._id', '#milestoneList').each(function() {
    milestoneIds.push($(this).text());
  });

  Meteor.call('action_plan_reorder_milestones', ap_id, milestoneIds, function (err) {
    if (!err) {
      console.log('action plan updated');
    }
  });
}