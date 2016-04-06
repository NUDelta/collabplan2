Meteor.methods({
    action_plan_new: function(data) {
        var id = ActionPlans.insert({
            name: data.name,
            description: data.description,
            build_milestones: data.build_milestones,
            steps: data.steps,
            affordances: data.affordances,
            min_functionality: data.min_functionality,
            reference_work: data.reference_work,
            requested_skills: data.requested_skills,
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
    action_plan_reset: function(actionPlanId) {
        // TODO: corresponding milestones and subtasks should be deleted as well
        ActionPlans.update({ _id: actionPlanId }, { $set: {
            milestone_ids: []
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
        ActionPlans.update(data._id, { $set: {
        	author_id: this.userId,
        	isComplete: data.isComplete
        }});
    },
    milestone_edit: function(data) {
    	Milestones.update(data._id, { $set: {
    		title: data.title,
    		motivation: data.motivation,
            tags: data.tags
    	}});
    },
    subtask_edit: function(data) {
    	Subtasks.update(data._id, { $set: {
    		description: data.description,
    		links: data.links,
    		milestone_ids: []
    	}});
    },
    milestone_delete: function(id, actionPlanId) {
        // TODO: corresponding milestones and subtasks should be deleted as well
    	ActionPlans.update({ _id: actionPlanId }, {
    		$pull: { milestone_ids: id }
    	});
    },
    subtask_delete: function(id) {
    	Subtasks.remove({ _id: id });
    },
    subtasks_delete_from_milestone: function(st_id, ms_id) {
        Subtasks.remove({ _id: st_id });
        Milestones.update({ _id: ms_id }, {
            $pull: { subtask_ids: st_id }
        });
        console.log('deleted ' + st_id);
    }
});
