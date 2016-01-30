function loadUser(user) {
  var userAlreadyExists = typeof Meteor.users.findOne({ username : user.username }) === 'object';

  if (!userAlreadyExists) {
    Accounts.createUser(user);
  }
}

function loadActionPlans(fixtures) {
  var i;

  for (i = 0; i < fixtures.length; i+= 1) {
    var fixtureAlreadyExists = typeof ActionPlans.findOne({ name : fixtures[i].name }) === 'object';

    if (!fixtureAlreadyExists) {
      fixtures[i].author_id = Meteor.users.findOne({username: 'admin'})._id;
      fixtures[i].requester_id = Meteor.users.findOne({username: 'test'})._id;
      var ap1_id = ActionPlans.insert(fixtures[i]);
    }
  }
}

function loadMilestones(fixtures) {
  var i;

  for (i = 0; i < fixtures.length; i+= 1) {
    var fixtureAlreadyExists = typeof Milestones.findOne({ name : fixtures[i].name }) === 'object';

    if (!fixtureAlreadyExists) {
      var ms1_id = Milestones.insert(fixtures[i]);
    }
  }
}

function loadSubtasks(fixtures) {
  var i;

  for (i = 0; i < fixtures.length; i+= 1) {
    var fixtureAlreadyExists = typeof Subtasks.findOne({ name : fixtures[i].name }) === 'object';

    if (!fixtureAlreadyExists) {
      var ms1_id = Subtasks.insert(fixtures[i]);
    }
  }
}

function loadLinks(fixtures) {
  var i;

  for (i = 0; i < fixtures.length; i+= 1) {
    var fixtureAlreadyExists = typeof Links.findOne({ name : fixtures[i].name }) === 'object';

    if (!fixtureAlreadyExists) {
      var ms1_id = Links.insert(fixtures[i]);
    }
  }
}

Meteor.startup(function () {
  var users = YAML.eval(Assets.getText('users.yml'));

  for (key in users) if (users.hasOwnProperty(key)) {
    loadUser(users[key]);
  }

  loadActionPlans(Fixtures['actionPlansFixture']);
  loadMilestones(Fixtures['milestonesFixture']);
  loadSubtasks(Fixtures['subtasksFixture']);
  loadLinks(Fixtures['linksFixture']);
});
