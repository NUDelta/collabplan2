Template['actionPlanCompose'].helpers({
  action_plan: function () {
    var id = Router.current().params._id;
    return ActionPlans.findOne({_id: id});
  },
  selected_milestone: function(){
    return Milestones.findOne({_id: Session.get('selected_milestone_id') || this.milestone_ids[0]});
  },
  request_user: function () {
    return Meteor.users.findOne({_id: this.requester_id});
  },
  last_save: function(){
    var last_save = new Date(Session.get('last_save'));
    return moment(last_save).format('MM/DD/YY, h:mm:ss a');
  },
  composerTutorialEnabled: function(){
    return Session.get('composerTutorialEnabled');
  },
  tutorial_options: function(){
    return {
      id: "composerTutorial",
      steps: tutorialSteps,
      emitter: new EventEmitter(),
      onFinish: function() {  Session.set('composerTutorialEnabled',false); }
    }
  }
});

Template['actionPlanCompose'].events({
  'click #request_info_btn': function(){
    Modal.show('requestInfoModal', this)
  },
  'click #tutorial_toggle': function(){
    Session.set('composerTutorialEnabled',true);
  }
});

var tutorialSteps = [
  {
    template: Template.composerTutorial_step1,
  },
  {
    template: Template.composerTutorial_step11,
    spot: "#request_info_btn",
  },
  {
    template: Template.composerTutorial_step2,
    spot: ".milestone-col",
  },
  {
    template: Template.composerTutorial_step3,
    spot: "#add_milestone",
  },
  {
    template: Template.composerTutorial_step4,
    spot: ".milestone_editor .panel",
  },
  {
    template: Template.composerTutorial_step5,
    spot: ".milestone_editor .table",
  }
];