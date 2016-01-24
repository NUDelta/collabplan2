Router.route('/', function () {
  this.render('home');
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