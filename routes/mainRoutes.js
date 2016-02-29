Router.route('/', function () {
  // this.render('home');
  Router.go('action_plans');
  SEO.set({ title: 'Home -' + Meteor.App.NAME });
});

Router.route('/action_plans', {
  name: 'action_plans',
  waitOn: function(){
    return [Meteor.subscribe('ActionPlans')];
  },
  action: function () {
    this.render('actionPlanList');
    SEO.set({ title: 'action_plans - ' + Meteor.App.NAME });
  }
});

Router.route('/action_plans/new', {
  name: 'action_plans.new',
  action: function () {
    this.render('actionPlanRequestForm');
    SEO.set({ title: 'New action_plans - ' + Meteor.App.NAME });
  }
});

Router.route('/action_plans/:_id', {
  name: 'action_plans.show',
  waitOn: function(){
    return [Meteor.subscribe('ActionPlans'),Meteor.subscribe('Milestones'),Meteor.subscribe('Subtasks')];
  },
  action: function () {
    var ap = ActionPlans.findOne({_id: this.params._id});
    if (!ap.isComplete && ap.requester_id === Meteor.userId()) {
      this.render('actionPlanRequestView');
      SEO.set({ title: 'ActionPlanRequest - ' + Meteor.App.NAME });
    } else if (ap.isComplete) { 
      this.render('actionPlanView');
      SEO.set({ title: 'ActionPlanView- ' + Meteor.App.NAME });
    } else if (!ap.isComplete && ap.requester_id !== Meteor.userId()) {
      this.render('actionPlanCompose');
      SEO.set({ title: 'actionPlanCompose- ' + Meteor.App.NAME });
    }
  }
});

Router.route('/user/edit', {
  name: 'user.edit',
  action: function () {
    this.render('userProfile');
    SEO.set({ title: 'New action_plans - ' + Meteor.App.NAME });
  }
});