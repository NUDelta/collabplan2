Meteor.methods({
    action_plan_new: function(data) {
        ActionPlans.insert({
            name: data.name,
            description: data.description,
            requester_id: this.userId,
            isComplete: false,
            milestone_ids: []
        })        
    }
});
