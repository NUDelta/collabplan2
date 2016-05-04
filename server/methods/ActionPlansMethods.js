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
    action_plan_recipe: function(ap_id ,ms_ids) {
        var milestones = Milestones.find({ _id: { $in: ms_ids } }).fetch();
        var newIds = [];

        for (var i = 0; i < milestones.length; ++i) {
            var ms = milestones[i];
            
            var id = Milestones.insert({
                title: ms.title,
                motivation: ms.motivation,
                subtask_ids: []
            });

            newIds.push(id);
        }

        ActionPlans.update( {_id: ap_id}, { $set: { milestone_ids: newIds } });
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
    action_plan_add_author: function(actionPlanId, authorId) {
        ActionPlans.update(actionPlanId, { $addToSet: {
            author_ids: authorId
        }});
    },
    milestone_new: function(data, actionPlanId) {
    	return milestone_new(data, actionPlanId);
    },
    subtask_new: function(data) {
    	return subtasks_new(data);
    },
    action_plan_edit: function(data) {
        ActionPlans.update(data._id, { $set: {
        	author_id: this.userId,
        	isComplete: data.isComplete
        }});
    },
    action_plan_select_template: function(template, ap_id){

        var ms_ids = [];

        for (var i = 0; i < template.milestone_ids.length; i++) {
            var ms = template.milestone_ids[i];

            var ms_id = Milestones.insert({
                title: ms.title,
                motivation: ms.motivation,
                subtask_ids: []
            });

            ms_ids.push(ms_id);

            var st_ids = [];

            for (var j = 0; j < ms.subtask_ids.length; j++) {
                var st = ms.subtask_ids[j];
                
                var st_id = Subtasks.insert({
                    description: st.description,
                    links: st.links,
                    milestone_ids: []
                });

                st_ids.push(st_id);
            }

            Milestones.update(ms_id, { $push: {
                subtask_ids: { $each: st_ids }
            }});
        }

        ActionPlans.update(ap_id, { $push: {
            milestone_ids: { $each: ms_ids }
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
        var ap = ActionPlans.findOne({ _id: actionPlanId });
        var ms_indx = ap.milestone_ids.indexOf(id);
    	ActionPlans.update({ _id: actionPlanId }, {
    		$pull: { milestone_ids: id }
    	});
        return ms_indx - 1;
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
    },
    milestone_find_with_tags: function(tags) {
        var res = Milestones.find({ tags: { $in: tags }}).fetch();

        for (var i = 0; i < res.length; ++i) {
            var matches = _.union(tags, res[i].tags).length;
            res[i]['matches'] = matches;
        }

        res = _.sortBy(res, 'matches');
        return res;
    },
    autofill_subtasks: function(src, target) {
        var old_ids = Milestones.findOne({ _id: src }).subtask_ids;
        var subtasks = Subtasks.find({ _id: { $in: old_ids } }).fetch();
        var subtask_ids = [];

        for (var i = 0; i < subtasks.length; ++i) {
            var subtask = subtasks[i];
            
            var id = Subtasks.insert({
                description: subtask.description,
                links: subtask.links,
                milestone_ids: []
            });

            subtask_ids.push(id);
        }

        Milestones.update(target, { $set: {
            subtask_ids: subtask_ids
        }});
    }
});

function milestone_new(data, actionPlanId) {
    var id = Milestones.insert({
        title: data.title,
        motivation: data.motivation,
        subtask_ids: []
    });

    ActionPlans.update(actionPlanId, { $push: {
        milestone_ids: id
    }});

    return id;
}

function subtasks_new(data) {
    var id = Subtasks.insert({
        description: data.description,
        links: data.links,
        milestone_ids: []
    });

    Milestones.update(data.milestone_id, { $push: {
        subtask_ids: id
    }});

    return id;
}
