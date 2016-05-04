Template['recipeMilestoneList'].helpers({
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

Template['recipeMilestoneList'].events({
  'click .milestone_tile': function() {
    Session.set('selected_milestone_id', this._id)
  },
  'submit #add_milestone': function(event) {
    event.preventDefault();

    var milestone_title = event.target.milestone_title.value;
    Meteor.call('recipe_add_milestone', {title: milestone_title, motivation: "", subtask_ids: []}, this._id, function (err, res) {
      if (!err) {
        Session.set('selected_milestone_id', res);
        event.target.milestone_title.value = "";
        Session.set('last_save', Date.now())
      }
    });
  },
  'click .tile_x': function (event) {
    event.preventDefault();

    var recipe = Template.currentData();
    var deleting_selected = this._id === Session.get('selected_milestone_id');

    Meteor.call('recipe_delete_milestone', this._id, recipe._id, function (err, res) {
      if (!err) {
        Session.set('last_save', Date.now());
        if (deleting_selected){
          Session.set('selected_milestone_id', recipe.milestone_ids[res]);
        }
      }
    });
  }
});

Template['recipeMilestoneList'].onRendered(function () {
  var recipe_id = this.data._id;
  Sortable.create($('.milestone_list').get()[0], { 
    onUpdate: function (event) {
      updateMilestoneIds(recipe_id);
    }
  });
});

function updateMilestoneIds(recipe_id) {
  var milestoneIds = [];

  $('._id', '.milestone_list').each(function() {
    milestoneIds.push($(this).text());
  });

  Meteor.call('recipe_reorder_milestones', recipe_id, milestoneIds, function (err) {
    if (!err) {
      console.log('recipe updated');
      Session.set('last_save', Date.now())
    }
  });
}