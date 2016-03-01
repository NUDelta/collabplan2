Meteor.methods({
    action_plan_new: function(data) {
        var id = ActionPlans.insert({
            name: data.name,
            description: data.description,
            prior_knowledge: data.prior_knowledge,
            requested_frameworks: data.requested_frameworks,
            requester_id: this.userId,
            isComplete: false,
            milestone_ids: []
        })        
    },
    action_plan_set_boilerplate: function(ap_id,ms_id) {
        ActionPlans.update(
            {_id: ap_id},
            {
                $push: {
                    milestone_ids: {
                        $each: [ms_id],
                        $position: 0
                    }
                },
                $set: {
                    author_id: this.userId
                }
            }
        );
    },
    action_plan_reorder_milestones: function(actionPlanId, milestoneIds) {
    	ActionPlans.update({ _id: actionPlanId }, { $set: {
        	milestone_ids: milestoneIds
        }});
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
        console.log('Ap edit');
        ActionPlans.update(data._id, { $set: {
        	author_id: this.userId,
        	isComplete: data.isComplete
        }});
    },
    milestone_edit: function(data) {
        console.log('Milestone edit');
    	Milestones.update(data._id, { $set: {
    		title: data.title,
    		motivation: data.motivation
    	}});
    },
    subtask_edit: function(data) {
        console.log('Subtasks edit');
    	Subtasks.update(data._id, { $set: {
    		description: data.description,
    		links: data.links,
    		milestone_ids: []
    	}});
    },
    milestone_delete: function(id, actionPlanId) {
    	ActionPlans.update({ _id: actionPlanId }, {
    		$pull: { milestone_ids: id }
    	});

    	// only remove if no other action plans use this milestone
    	// if (ActionPlans.find({ milestone_ids: id }).count() < 1)
    	// 	Milestones.remove({ _id: id });
    },
    subtask_delete: function(id) {
    	Subtasks.remove({ _id: id });
    }
});
