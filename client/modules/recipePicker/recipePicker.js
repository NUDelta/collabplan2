Template['recipePicker'].helpers({
	recipes: function(){
		return Recipes.find();
    },
    request_user_skills: function (user_id) {
        return Meteor.users.findOne({_id: user_id}).profile.skills;
    },
    selected_recipe: function() {
    	return Session.get('selected_recipe');
    },
    recipe_milestones: function() {
    	return Session.get('selected_recipe');
    },
    get_milestone: function (id) {
		return Milestones.findOne({_id: id});
	},
	get_subtasks: function (id) {
		return Subtasks.findOne({_id: id});
	},
    plus_one: function(num) {
    	return num+1;
    }
});

Template['recipePicker'].events({
	'click .select-recipe': function(e){
		Session.set('selected_recipe', this);
		$('#recipe-preview').show();
		$('#recipe-list').hide();
    },
    'click #confirm-recipe': function(e){
    	var recipe = Session.get('selected_recipe');
        var ap = Session.get('current_ap');
        if (ap.milestone_ids.length > 0)
            confirm("This will delete your progress and replace it with this recipe. Are you sure that you want to continue?")
        Meteor.call('action_plan_recipe', ap._id, recipe.milestone_ids);
    },
    'click #cancel-recipe': function(e){
		$('#recipe-preview').hide();
		$('#recipe-list').show();
    }
});

Template['recipePicker'].onRendered(function(){
    Session.set('current_ap', this.data)
})