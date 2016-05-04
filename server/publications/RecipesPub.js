Meteor.publish('Recipes', function () {
  return Recipes.find();
});

Meteor.publish('RecipesById', function (id) {
  return Recipes.find({_id: id});
});