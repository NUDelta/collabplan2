Meteor.methods({
    action_plan_new: function(data) {
        var id = ActionPlans.insert({
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
    },
    milestone_new: function(data, actionPlanId) {
    	var id = Milestones.insert({
    		title: data.title,
            motivation: data.motivation,
            subtask_ids: []
    	});

    	ActionPlans.update(actionPlanId, { $push: {
    		milestone_ids: id
    	}});

    	return id;
    },
    subtask_new: function(data) {
    	var id = Subtasks.insert({
    		description: data.description,
    		links: data.links,
    		milestone_ids: []
    	});

    	Milestones.update(data.milestone_id, { $push: {
    		subtask_ids: id
    	}});

    	return id;
    },
    action_plan_edit: function(data) {
        ActionPlans.update(data._id, { $set: {
        	author_id: this.userId,
        	isComplete: data.isComplete
        }});
    },
    milestone_edit: function(data, actionPlanId) {
    	Milestones.update(data._id, { $set: {
    		title: data.title,
    		motivation: data.motivation
    	}});

    	ActionPlans.update(actionPlanId, { $push: {
    		milestone_ids: data._id
    	}});
    },
    subtask_edit: function(data) {
    	Subtasks.update(data._id, { $set: {
    		description: data.description,
    		links: data.links,
    		milestone_ids: []
    	}});

    	Milestones.update(data.milestone_id, { $push: {
    		subtask_ids: data._id
    	}});
    },
    milestone_delete: function(id) {
    	Milestones.remove({ _id: id });
    },
    subtask_delete: function(id) {
    	Subtasks.remove({ _id: id });
    }
});
