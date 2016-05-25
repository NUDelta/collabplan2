Template['milestonePicker'].helpers({
    results: function() {
        return Session.get('search_results') || ActionPlans.find({}).fetch();
    },
    get_milestone: function (id) {
        return Milestones.findOne({_id: id});
    },
});

Template['milestonePicker'].events({
    'keyup #ms_search': function(e) {
        var target = e.target;

        Meteor.call('ap_and_rep_search', target.value || '', function(err,res){
            if(!err) {
                Session.set('search_results', res);
            }
        })
    } 
});

Template['milestonePicker'].onRendered(function () {
    var ap_id = this.data._id;
    
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
  

  Sortable.create($('#current_ap').get()[0], { 
    group: {
        name: 'current_ap',
        put: ['search_results']
    },
    sort: true,
    filter: '.disabled',
    handle: '.ms_row',
    onAdd: function(){
        updateMilestoneIds(ap_id)
    }
  });

});

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