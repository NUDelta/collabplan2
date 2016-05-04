Template['recipeCompose'].helpers({
  recipe: function () {
    var id = Router.current().params._id;
    return Recipes.findOne({_id: id});
  },
  selected_milestone: function(){
    return Milestones.findOne({_id: Session.get('selected_milestone_id') || this.milestone_ids[0]});
  },
  request_user: function () {
    return Meteor.users.findOne({_id: this.requester_id});
  },
  last_save: function(){
    var last_save = new Date(Session.get('last_save') || this.modifiedAt);
    return moment(last_save).format('MM/DD/YY, h:mm:ss a');
  }
});

Template['recipeCompose'].events({
});

Template['recipeCompose'].onRendered(function(){
  Session.set('selected_milestone_id', null);
})
