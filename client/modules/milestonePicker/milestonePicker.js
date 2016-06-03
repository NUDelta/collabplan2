Template['milestonePicker'].helpers({
    results: function() {
        return Session.get('search_results');
    },
    get_milestone: function (id) {
        return Milestones.findOne({_id: id});
    },
    get_subtask: function (id) {
        return Subtasks.findOne({_id: id});
    },
    milestoneHasKeyword: function(ms) {
        var keyword = Session.get('keyword');
        return (new RegExp(keyword,'i')).test(ms.title) || (new RegExp(keyword)).test(ms.motivation);
    }
});

Template['milestonePicker'].events({
    'click #ap_submit': function(events){
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
  'click .subtask_number': function(event){
    $(event.target).next().toggle();
  },

    'keyup #ms_search': function(e) {
        var target = e.target;
        Session.set('keyword',target.value );
        Meteor.call('ap_and_rep_search', target.value || '', function(err,res){
            if(!err) {
                Session.set('search_results', res);
                make_aps_draggable();
            }
        })
    } 
});

Template['milestonePicker'].onRendered(function () {
    var ap_id = this.data._id;
    
    
    make_aps_draggable();

    Sortable.create($('#current_ap').get()[0], { 
        group: {
            name: 'current_ap',
            put: ['search_results']
        },
        sort: true,
        filter: '.disabled',
        handle: '.ms_row',
        onUpdate: function(){
            updateMilestoneIds(ap_id)
        },
        onAdd:function(e){
            var id = e.item.dataset.id;
            Meteor.call('duplicate_milestone', id, function(err,new_id){
                if(!err) {
                    e.item.dataset.id = new_id;
                    updateMilestoneIds(ap_id)
                    $(e.item).remove();
                }
            })
        }
    });

});

function make_aps_draggable(){
    $('.ap_panel').get().forEach(function($this){
        Sortable.create($this, { 
            group: {
                name: 'search_results',
                pull:'clone',
                put: false
            },
            sort: false,
            filter: '.disabled',
            handle: '.list-group-item'
        });
    })
}

function updateMilestoneIds(ap_id) {
  var milestoneIds = [];

  $('#current_ap .ms_row').each(function() {
    milestoneIds.push($(this).data('id'));
  });

  Meteor.call('action_plan_reorder_milestones', ap_id, milestoneIds, function (err) {
    if (!err) {
      console.log('action plan updated');
      Session.set('last_save', Date.now())
    }
  });
}