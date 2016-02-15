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
    is_complete_subtask: function (id) {
        var ap_id = Router.current().params._id;
        var progress = Meteor.user().profile.progress[ap_id] || [];
        return progress.indexOf(id) !== -1;
    }

});

Template['actionPlanView'].events({
    'click .complete_cb': function() {
        var ap_id = Router.current().params._id;
        Meteor.call('user_toggle_subtasks_completion', ap_id, this._id);
    }
});
