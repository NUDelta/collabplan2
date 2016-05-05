Template['recipePicker'].helpers({
	recipes: function(){
		return Recipes.find();
    },
    request_user_skills: function (user_id) {
        return Meteor.users.findOne({_id: user_id}).profile.skills;
    }
});

Template['recipePicker'].events({
	'click .select-recipe': function(e){
        var ap = Session.get('current_ap')
        Meteor.call('action_plan_recipe', ap._id, this.milestone_ids);
    }
});

Template['recipePicker'].onRendered(function(){
    Session.set('current_ap', this.data)
})