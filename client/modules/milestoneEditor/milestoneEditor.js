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
              Session.set('last_save', Date.now())
            }
          });
        } else {
          alert("Add a milestone title and motivation first.");
          return;
        }
    },
    'click .delete-subtask': function (event) {
        event.preventDefault();
        var milestone = Template.currentData();
        console.log('deleting ' + this._id);

        Meteor.call('subtasks_delete_from_milestone', this._id, milestone._id, function (err, res) {
          if (!err) {
            Session.set('last_save', Date.now())
          } else {
            console.log(err);
          }
        });
    },
});

function updateMilestone(event) {
  var milestoneSelector = $(event.target).parent().parent();
  var milestone = {
    _id: $('#_id', milestoneSelector).val(),
    title: $('#title', milestoneSelector).val(),
    motivation: $('#motivation', milestoneSelector).val(),
    tags: getTags($('#title', milestoneSelector).val())
  }

  Meteor.call('milestone_edit', milestone, function (err) {
    if (!err) {
      Session.set('last_save', Date.now())
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
      Session.set('last_save', Date.now())
    }
  });
}

function getTags(str) {
  var tags = [];
  var words = str.toLowerCase().split(' ');
  words.forEach(function(e) {
    if (e in TAGS)
      tags.push(e);
  });
  return tags;
}

