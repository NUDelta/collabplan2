// The "||" notation doesn't work yet
Fixtures = typeof Fixtures !== "undefined" ? Fixtures : {};

Fixtures.actionPlansFixture = [
  {
    name: "Test Action Plan",
    description: "An action plan for testing",
    isComplete: false,
    author_id: 'admin',
    requester_id: 'test',
    milestone_ids: [
      {
        title: "Test Boilerplate",
        motivation: "Get shit started",
        tags: ['boilerplate', 'python'],
        subtask_ids: [
          {
            description: "Set up site",
            milestone_ids: [],
            links: ['test.com']
          },
          {
            description: "More set up stuff",
            milestone_ids: [],
            links: ['test.com']
          },
        ],
      },
    ],
  }
];
