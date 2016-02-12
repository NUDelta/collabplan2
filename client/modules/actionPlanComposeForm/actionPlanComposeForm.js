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
    if (!confirm('Are you sure you want to submit? You cannot edit the action plan after submission.'))
      return;

    var actionPlanId = Router.current().params._id;

    saveMilestonesAndSubtasks();

    var actionPlan = {
      _id: actionPlanId,
      isComplete: true
    };

    Meteor.call('action_plan_edit', actionPlan, function (err) {
      if (!err) {
        Router.go('action_plans')
      }
    });
  },
  'input input#title': function (event) {
    updateMilestone(event);
  },
  'input textarea#motivation': function (event) {
    updateMilestone(event);
  },
  'input input#description': function (event) {
    updateSubtask(event);
  },
  'input input#links': function (event) {
    updateSubtask(event);
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
      alert("Add a milestone title and motivation first.");
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
    var actionPlanId = Session.get("ap")._id;

    Meteor.call('milestone_delete', id, actionPlanId, function (err, res) {
      if (!err) {
        console.log('milestone deleted');
      }
    });
  }
});

var handle = null; // used for timeout

function saveMilestonesAndSubtasks() {
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

  return;
}

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


function updateMilestone(event) {
  if (handle)
    clearTimeout(handle);

  handle = setTimeout(function() {
    var milestoneSelector = $(event.target).parent().parent();
    var milestone = {
      _id: $('#_id', milestoneSelector).val(),
      title: $('#title', milestoneSelector).val(),
      motivation: $('#motivation', milestoneSelector).val()
    }

    Meteor.call('milestone_edit', milestone, function (err) {
      if (!err) {
        console.log('milestone updated');
      }
    });
  }, 500);
}

function updateSubtask(event) {
  if (handle)
    clearTimeout(handle);

  handle = setTimeout(function() {
    var subtaskSelector = $(event.target).parent().parent();
    var subtask = {
      _id: $('#_id', subtaskSelector).val(),
      description: $('#description', subtaskSelector).val(),
      links: [$('#links', subtaskSelector).val()]
    }

    Meteor.call('subtask_edit', subtask, function (err) {
      if (!err) {
        console.log('subtask updated');
      }
    });
  }, 500);
}