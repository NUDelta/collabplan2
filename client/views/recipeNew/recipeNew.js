Template['recipeNew'].helpers({
    user: function(){
        return Meteor.user();
    }
});

Template['recipeNew'].events({
    'submit #recipe-new': function (event) {
        event.preventDefault();

        var request =  {
            name: event.target.name.value,
            description: event.target.description.value
        };

        Meteor.call('recipe_new', request, function (err, res) {
            if (!err) {
                Router.go('recipes.show', {_id: res});
            }
        })
    }
});
