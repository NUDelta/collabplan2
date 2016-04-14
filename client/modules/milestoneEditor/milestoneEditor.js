Template['milestoneEditor'].helpers({
    get_subtasks: function (id) {
        return Subtasks.findOne({_id: id});
    },
});

Template['milestoneEditor'].events({
    'focus .update_milestone': function (event) {
        updateAutocompleteOptions(event);
        $('.autocomplete-content').show();
    },
    'blur .update_milestone': function (event) {
        $('.autocomplete-content').hide();
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
    'keyup #title': function (event) {
      if (event.keyCode !== 32)
        return;

      updateAutocompleteOptions(event);
    }
});

Template['milestoneEditor'].onRendered(function () {
  // add listener for dynamic elements
  $('.autocomplete').on('mousedown', '.autocomplete-option', function() {
    $('#title').val($('.autocomplete-title', event.target).text());
    $('#motivation').val($('.autocomplete-motivation', event.target).text());
    updateMilestone(event);
  })
});

function updateMilestone(event) {
  var milestoneSelector = $('.milestone_editor');
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

function updateAutocompleteOptions(event) {
  $('.autocomplete-content').empty();

  var title = $.trim($('#title').val());
  var tags = getTags($(event.target).val());
  var dedupeSet = {}; // set used to prevent duplicates in autocomplete
  Meteor.call('milestone_find_with_tags', tags, function (err, res) {
    if (!err) {
      for (var i = 0; i < res.length; ++i) {
        if (res[i].title === title || res[i].title in dedupeSet)
          continue;

        var str = '<div class="autocomplete-option"><span class="autocomplete-title">' + res[i].title + 
        '</span><span class="autocomplete-motivation">' + res[i].motivation + '</span></div>';
        $('.autocomplete-content').append(str);

        dedupeSet[res[i].title] = true;
      }
    } else {
      console.log(err);
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
