Template['actionPlanComposeForm'].helpers({
  getMilestones: function () {
    return Milestones.find({ _id: { $in: this.milestone_ids } });
  },
  getSubtasks: function () {
    return Subtasks.find({ _id: { $in: this.subtask_ids } });
  }
});

Template['actionPlanComposeForm'].events({
  'submit #ap_request': function (event) {
    event.preventDefault();

    var actionPlanId = Router.current().params._id;
    var milestonesAndSubtasks = getMilestonesAndSubtasks();

    milestonesAndSubtasks.subtasks.forEach(function(e, i, a) {
      Meteor.call('subtask_edit', e, function (err) {
        if (!err) {
          console.log('subtask updated');
        }
      });
    });

    milestonesAndSubtasks.milestones.forEach(function(e, i, a) {
      Meteor.call('milestone_edit', e, function (err) {
        if (!err) {
          console.log('milestone updated');
        }
      });
    });

    var actionPlan = {
      _id: actionPlanId,
      isComplete: event.target.isComplete.checked
    };

    Meteor.call('action_plan_edit', actionPlan, function (err) {
      if (!err) {
        Router.go('action_plans')
      }
    });
  },
  'click .add-subtask': function (event) {
    event.preventDefault();

    var milestone = $(event.target).parent().parent();
    var actionPlanId = Router.current().params._id;

    // check that milestone has a title and motivation first
    if ($('input#title', milestone).val() && $('textarea#motivation', milestone).val()) {
      Meteor.call('subtask_new', {description: "", links: [], milestone_id: $('#_id', milestone).val()}, function (err) {
        if (!err) {
          console.log('subtask saved');
        }
      });
    } else {
      return;
    }
  },
  'click .add-milestone': function (event) {
    event.preventDefault();
    var actionPlanId = Router.current().params._id;

    Meteor.call('milestone_new', {title: "", motivation: "", subtask_ids: []}, actionPlanId, function (err, res) {
      if (!err) {
        console.log('milestone saved');
      }
    });
  },
  'click .delete-subtask': function (event) {
    event.preventDefault();
    var subtask = $(event.target).parent().parent();
    var id = $('#_id', subtask).val();

    Meteor.call('subtask_delete', id, function (err, res) {
      if (!err) {
        console.log('subtask deleted');
      }
    });
  },
  'click .delete-milestone': function (event) {
    event.preventDefault();
    var milestone = $(event.target).parent().parent();
    var id = $('#_id', milestone).val();

    Meteor.call('milestone_delete', id, function (err, res) {
      if (!err) {
        console.log('subtask deleted');
      }
    });
  }
});

function getMilestonesAndSubtasks() {
  var milestones = [];
  var subtasks = [];
  var milestone = {};

  $('.milestone').each(function() {
    milestone = {
      _id: $('#_id', this).val(),
      title: $('#title', this).val(),
      motivation: $('#motivation', this).val()
    }
    milestones.push(milestone);
    var newSubtasks = getCorrespondingSubtasks(this);
    subtasks = subtasks.concat(newSubtasks);
  });

  var milestonesAndSubtasks = {
    milestones: milestones,
    subtasks: subtasks
  }

  return milestonesAndSubtasks;
}

function getCorrespondingSubtasks(milestone) {
  var correspondingSubtasks = [];
  var subtask = {};

  $('.subtask', milestone).each(function() {
    subtask = {
      _id: $('#_id', this).val(),
      description: $('#description', this).val(),
      links: [$('#links', this).val()],
      milestone_id: $('#_id', milestone).val()
    }
    correspondingSubtasks.push(subtask);
  });

  return correspondingSubtasks;
}
