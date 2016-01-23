Router.route('/', function () {
  this.render('home');
  SEO.set({ title: 'Home -' + Meteor.App.NAME });
});

Router.route('/action_plans', {
  name: 'action_plans',
  waitOn: function(){
    return [Meteor.subscribe('ActionPlans')];
  },
  data: function(){
    return { 
      action_plans: ActionPlans.find({}),
    }
  },
  action: function () {
    this.render('actionPlanList');
    SEO.set({ title: 'action_plans - ' + Meteor.App.NAME });
  }
});
