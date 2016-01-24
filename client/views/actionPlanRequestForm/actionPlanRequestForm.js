Template['actionPlanRequestForm'].helpers({
});

Template['actionPlanRequestForm'].events({
    'submit #ap_request': function (event) {
        event.preventDefault();

        var request =  {
            name: event.target.name.value,
            description: event.target.description.value
        };

        Meteor.call('action_plan_new', request, function (err) {
            if (!err) {
                Router.go('action_plans')
            }
        })
    }
});
