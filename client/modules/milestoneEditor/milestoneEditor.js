Template['milestoneEditor'].helpers({
    get_subtasks: function (id) {
        return Subtasks.findOne({_id: id});
    },
});

Template['milestoneEditor'].events({
    'blur .update_milestone': function (event) {
        updateMilestone(event);
    },
    'blur .update_substask': function (event) {
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
              changesSaved();
            }
          });
        } else {
          alert("Add a milestone title and motivation first.");
          return;
        }
    },
    'click .delete-subtask': function (event) {
        event.preventDefault();
        var subtask = $(event.target).parent().parent();
        var id = $('#_id', subtask).val();

        Meteor.call('subtask_delete', id, function (err, res) {
          if (!err) {
            console.log('subtask deleted');
            changesSaved();
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
            changesSaved();
          }
        });
    }
});

function updateMilestone(event) {
  var milestoneSelector = $(event.target).parent().parent();
  var milestone = {
    _id: $('#_id', milestoneSelector).val(),
    title: $('#title', milestoneSelector).val(),
    motivation: $('#motivation', milestoneSelector).val()
  }

  Meteor.call('milestone_edit', milestone, function (err) {
    if (!err) {
      console.log('milestone updated');
      changesSaved();
    }
  });
}

function updateSubtask(event) {
  var subtaskSelector = $(event.target).parent().parent();
  var subtask = {
    _id: $('#_id', subtaskSelector).val(),
    description: $('#description', subtaskSelector).val(),
    links: [$('#links', subtaskSelector).val()]
  }

  Meteor.call('subtask_edit', subtask, function (err) {
    if (!err) {
      console.log('subtask updated');
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