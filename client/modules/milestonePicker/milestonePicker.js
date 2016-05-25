Template['milestonePicker'].helpers({
    results: function() {
        return Session.get('search_results') || [];
    }
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
