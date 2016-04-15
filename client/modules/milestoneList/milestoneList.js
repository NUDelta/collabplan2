Template['milestoneList'].helpers({
	get_milestone: function (id) {
    return Milestones.findOne({_id: id});
  },
  get_subtasks: function (id) {
    return Subtasks.findOne({_id: id});
  },
  is_selected_milestone: function(id) {
    return Session.get('selected_milestone_id') === id;
  },
  plus_one: function(num) {
    return num+1;
  }
});

Template['milestoneList'].events({
  'click .milestone_tile': function() {
    Session.set('selected_milestone_id', this._id)
  },
  'submit #add_milestone': function(event) {
    event.preventDefault();

    var milestone_title = event.target.milestone_title.value;
    Meteor.call('milestone_new', {title: milestone_title, motivation: "", subtask_ids: []}, this._id, function (err, res) {
      if (!err) {
        Session.set('selected_milestone_id', res)
        event.target.milestone_title.value = "";
        Session.set('last_save', Date.now())
      }
    });
  },
  'click .tile_x': function (event) {
    event.preventDefault();

    var ap = Template.currentData();

    Meteor.call('milestone_delete', this._id, ap._id, function (err, res) {
      if (!err) {
        Session.set('last_save', Date.now())
      }
    });
  }
});

Template['milestoneList'].onRendered(function () {
  var ap_id = this.data._id;
  Sortable.create($('.milestone_list').get()[0], { 
    onUpdate: function (event) {
      updateMilestoneIds(ap_id);
    }
  });
});

function updateMilestoneIds(ap_id) {
  var milestoneIds = [];

  $('._id', '.milestone_list').each(function() {
    milestoneIds.push($(this).text());
  });

  Meteor.call('action_plan_reorder_milestones', ap_id, milestoneIds, function (err) {
    if (!err) {
      console.log('action plan updated');
      Session.set('last_save', Date.now())
    }
  });
}