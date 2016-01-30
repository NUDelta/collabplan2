Meteor.methods({
    action_plan_new: function(data) {
        ActionPlans.insert({
            name: data.name,
            description: data.description,
            requester_id: this.userId,
            isComplete: false,
            milestone_ids: []
        })        
    },
    action_plan_add_milestone: function(ap_id,ms_id) {
        ActionPlans.update(
            {_id: ap_id},
            {$push: {milestone_ids: ms_id}}
        );
    }
});
