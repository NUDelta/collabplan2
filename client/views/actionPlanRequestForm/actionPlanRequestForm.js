Template['actionPlanRequestForm'].helpers({
});

Template['actionPlanRequestForm'].events({
    'submit #ap_request': function (event) {
        event.preventDefault();

        var request =  {
            name: event.target.name.value,
            description: event.target.description.value,
            prior_knowledge: event.target.prior_knowledge.value,
            requested_frameworks: event.target.requested_frameworks.value
        };

        console.log(request);

        Meteor.call('action_plan_new', request, function (err) {
            if (!err) {
                Router.go('action_plans')
            }
        })
    }
});
