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
      fixtures[i].author_id = Meteor.users.findOne({username: 'admin'})._id;
      fixtures[i].requester_id = Meteor.users.findOne({username: 'test'})._id;
      fixtures[i].milestone_ids.push(milestone_ids[0]);
      var ap1_id = ActionPlans.insert(fixtures[i]);

      output.push(ap1_id);
    }
  }
  return output;
}

function loadMilestones(fixtures, subtask_ids) {
  var i;

  var output = [];

  //console.log(subtask_ids)

  for (i = 0; i < fixtures.length; i+= 1) {
    var fixtureAlreadyExists = typeof Milestones.findOne({ name : fixtures[i].name }) === 'object';

    if (!fixtureAlreadyExists) {
      fixtures[i].subtask_ids.push(subtask_ids[0]);
      var ms1_id = Milestones.insert(fixtures[i]);

      output.push(ms1_id);
    }
  }
  return output;
}

function loadSubtasks(fixtures, link_ids) {
  var i;

  var output = []

  // console.log(link_ids)

  for (i = 0; i < fixtures.length; i+= 1) {
    var fixtureAlreadyExists = typeof Subtasks.findOne({ name : fixtures[i].name }) === 'object';

    if (!fixtureAlreadyExists) {
      fixtures[i].link_ids.push(link_ids[0]);
      var ms1_id = Subtasks.insert(fixtures[i]);

      output.push(ms1_id);
    }
  }

  return output;
}

function loadLinks(fixtures) {
  var i;
  var output = [];

  for (i = 0; i < fixtures.length; i+= 1) {
    var fixtureAlreadyExists = typeof Links.findOne({ name : fixtures[i].name }) === 'object';

    if (!fixtureAlreadyExists) {
      var ms1_id = Links.insert(fixtures[i]);

      output.push(ms1_id);

      //console.log(output);
    }
  }

  console.log(output);

  return output;
}

Meteor.startup(function () {
  var users = YAML.eval(Assets.getText('users.yml'));

  for (key in users) if (users.hasOwnProperty(key)) {
    loadUser(users[key]);
  }
  var link_ids = loadLinks(Fixtures['linksFixture']) ;
  var subtask_ids = loadSubtasks(Fixtures['subtasksFixture'], link_ids);
  var milestone_ids = loadMilestones(Fixtures['milestonesFixture'], subtask_ids);
  var actionplan_ids = loadActionPlans(Fixtures['actionPlansFixture'], milestone_ids);
});
