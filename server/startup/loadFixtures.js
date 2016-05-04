function loadUser(user) {
  var userAlreadyExists = typeof Meteor.users.findOne({ username : user.username }) === 'object';

  if (!userAlreadyExists) {
    Accounts.createUser(user);
  }
}

function loadActionPlans(fixtures, milestone_ids) {
  var i;

  var output = [];

  for (i = 0; i < fixtures.length; i+= 1) {
    var fixtureAlreadyExists = typeof ActionPlans.findOne({ name : fixtures[i].name }) === 'object';

    if (!fixtureAlreadyExists) {
        var ap = fixtures[i];
        ap.author_ids = Meteor.users.find({username: {$in: ap.author_ids}}).fetch().map(function(x){ return x._id;});
        ap.requester_id = Meteor.users.findOne({username: ap.requester_id})._id;
        ap.milestone_ids = loadMilestones(ap.milestone_ids);
      
        var ap1_id = ActionPlans.insert(fixtures[i]);
        console.log(ap);
        output.push(ap1_id);
    }
  }
  return output;
}
 
function loadMilestones(fixtures) {
  var i;
  var output = [];

  for (i = 0; i < fixtures.length; i+= 1) {
    var fixtureAlreadyExists = typeof Milestones.findOne({title : fixtures[i].title}) === 'object';

    if (!fixtureAlreadyExists) {
      var ms = fixtures[i];
      ms.subtask_ids = loadSubtasks(ms.subtask_ids);
      var ms1_id = Milestones.insert(ms);
      output.push(ms1_id);
    }
  }
  return output;
}

function loadSubtasks(fixtures) {
  var i;
  var output = [];

  for (i = 0; i < fixtures.length; i+= 1) {
    var fixtureAlreadyExists = typeof Subtasks.findOne({description : fixtures[i].description}) === 'object';

    if (!fixtureAlreadyExists) {
      var st = fixtures[i]
      var ms1_id = Subtasks.insert(st);
      output.push(ms1_id);
    }
  }
  return output;
}

Meteor.startup(function () {
  var users = YAML.eval(Assets.getText('users.yml'));

  for (key in users) if (users.hasOwnProperty(key)) {
    loadUser(users[key]);
  }

  var actionplan_ids = loadActionPlans(Fixtures['actionPlansFixture']);
  var actionplan_ids = loadMilestones(Fixtures['milestonesFixture']);
});
