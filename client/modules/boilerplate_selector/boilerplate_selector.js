Template['boilerplate_selector'].helpers({
    boiler_plate_milestones: function(){
        return Milestones.find({tags: {$in: ['boilerplate']}});
    },
});

Template['boilerplate_selector'].events({
    'click #select_ap': function(e){
        var ap = Session.get('current_ap')
        Meteor.call('action_plan_set_boilerplate', ap._id, this._id);
    }
});

Template['boilerplate_selector'].onRendered(function(){
    Session.set('current_ap',this.data)
})