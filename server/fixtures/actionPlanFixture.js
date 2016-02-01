// The "||" notation doesn't work yet
Fixtures = typeof Fixtures !== "undefined" ? Fixtures : {};

Fixtures.actionPlansFixture = [
  {
    name: "Test Action Plan",
    description: "An action plan for testing",
    milestone_ids: [],
    isComplete: false
  }
];

Fixtures.milestonesFixture = [
  {
    title: "Test Boilerplate",
    motivation: "Get shit started",
    subtask_ids: [],
    tags: ['boilerplate', 'python']
  }
];