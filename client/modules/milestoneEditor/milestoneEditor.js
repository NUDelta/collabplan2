Template['milestoneEditor'].helpers({
    get_subtasks: function (id) {
        return Subtasks.findOne({_id: id});
    },
});

Template['milestoneEditor'].events({
    'focus .update_milestone': function (event) {
        updateAutocompleteOptions(event);
    },
    'blur .update_milestone': function (event) {
        $('.autocomplete-content').hide();
        updateMilestone();
    },
    'blur .update_substask': function (event) {
        var subtaskSelector = $(event.target).parent()[0];
        
        var subtask = {
          _id: this._id,
          description: $('#description', subtaskSelector).val(),
          links: [$('#links', subtaskSelector).val()]
        }

        Meteor.call('subtask_edit', subtask, function (err) {
          if (!err) {
            Session.set('last_save', Date.now())
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
      if (event.keyCode === 40 && $('.autocomplete-option').length)
        handleDownArrow();

      if (event.keyCode === 38 && $('.autocomplete-option').length)
        handleUpArrow();

      if (event.keyCode === 13 && $('.autocomplete-option').length) 
        selectAutocompleteOption()

      if (event.keyCode !== 32)
        return;

      updateAutocompleteOptions(event);
    }
});

Template['milestoneEditor'].onRendered(function () {
  // add listener for dynamic elements
  $('.autocomplete').on('mousedown', '.autocomplete-option', function() {
    var autocompleteOption = $(event.target);
    var milestoneSelector = $('.milestone_editor');

    // if text is clicked instead of div
    if ($(event.target).hasClass('autocomplete-title'))
      autocompleteOption = autocompleteOption.parent();

    $('#title').val($('.autocomplete-title', autocompleteOption).text());
    $('#motivation').val($('.autocomplete-motivation', autocompleteOption).text());
    autofillSubtasks($('.autocomplete-id', autocompleteOption).text(), $('#_id', milestoneSelector).val());
    updateMilestone();
  });

  var ms_id = this.data._id;
  Sortable.create($('#subtask_list').get()[0], { 
    handle: ".st_handle",
    onUpdate: function (event) {
      updateSubtasksIds(ms_id);
    }
  });

});

function updateSubtasksIds(ms_id) {
  var subtasksIds = [];

  $('.st_row').each(function() {
    subtasksIds.push($(this).data('id'));
  });

  Meteor.call('milestone_reorder_subtasks', ms_id, subtasksIds, function (err) {
    if (!err) {
      Session.set('last_save', Date.now())
    }
  });
}

function updateMilestone() {
  $('.autocomplete-selected').removeClass('autocomplete-selected');
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

function autofillSubtasks(src, target) {
  Meteor.call('autofill_subtasks', src, target, function (err) {
    if (!err) {
      Session.set('last_save', Date.now())
    }
  });
}

function updateAutocompleteOptions(event) {
  var title = $.trim($('#title').val());
  var tags = getTags($(event.target).val());
  var dedupeSet = {}; // set used to prevent duplicates in autocomplete
  Meteor.call('milestone_find_with_tags', tags, function (err, res) {
    if (!err) {
      for (var i = 0; i < res.length; ++i) {
        if (res[i].title === title || res[i].title in dedupeSet)
          continue;

        var str = '<div class="autocomplete-option"><span class="autocomplete-title">' + res[i].title + 
        '</span><span class="autocomplete-motivation">' + res[i].motivation + '</span>' +
        '<span class="autocomplete-id">' + res[i]._id + '</span></div>';
        $('.autocomplete-content').append(str);

        dedupeSet[res[i].title] = true;
      }
    } else {
      console.log(err);
    }
  });

  $('.autocomplete-content').empty();
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

function handleDownArrow() {
  $('.autocomplete-content').show();
  // if last option is selected, do nothing
  if ($('.autocomplete-option').last().hasClass('autocomplete-selected'))
      return;

  var current = $('.autocomplete-selected');
  if (current.length) {
    current.next().addClass('autocomplete-selected');
    current.removeClass('autocomplete-selected');
  } else {
    $('.autocomplete-option').first().addClass('autocomplete-selected');
  }
}

function handleUpArrow() {
  // if first option is selected, do nothing
  if ($('.autocomplete-option').first().hasClass('autocomplete-selected'))
      return;

  var current = $('.autocomplete-selected');
  if (current.length) {
    current.prev().addClass('autocomplete-selected');
    current.removeClass('autocomplete-selected');
  }
}

function selectAutocompleteOption() {
  var current = $('.autocomplete-selected');
  var milestoneSelector = $('.milestone_editor');
  if (current.length) {
    $('#title').val($('.autocomplete-title', current).text());
    $('#motivation').val($('.autocomplete-motivation', current).text());
    autofillSubtasks($('.autocomplete-id', current).text(), $('#_id', milestoneSelector).val());
    updateMilestone();
    $('.autocomplete-content').hide();
  } else {
    return;
  } 
}
