Template['actionPlanView'].helpers({
	action_plan: function () {
        var id = Router.current().params._id;
        return ActionPlans.findOne({_id: id});
    },
    get_milestones: function (id) {
    	return Milestones.findOne({_id: id});
    },
	get_subtasks: function (id) {
    	return Subtasks.findOne({_id: id});
    },
    get_links: function (id) {
    	return Links.findOne({_id: id});
    },

});

Template['actionPlanView'].events({
});
