Template['actionPlanRequestForm'].helpers({
    user: function(){
        return Meteor.user();
    }
});

Template['actionPlanRequestForm'].events({
    'submit #ap_request': function (event) {
        event.preventDefault();

        var request =  {
            name: event.target.name.value,
            description: event.target.description.value,
            build_milestones: event.target.build_milestones.value,
            steps: event.target.steps.value,
            affordances: event.target.affordances.value,
            min_functionality: event.target.min_functionality.value,
            reference_work: event.target.reference_work.value,
            requested_skills: []
        };

        for (var i = Meteor.user().profile.skills.length - 1; i >= 0; i--) {
            var skill = Meteor.user().profile.skills[i];
            if (event.target[skill.name].checked) {
                request.requested_skills.push(skill.name);
            }
        };

        console.log(request);

        Meteor.call('action_plan_new', request, function (err) {
            if (!err) {
                Router.go('learner_home')
            }
        })
    }
});
