// The "||" notation doesn't work yet
Fixtures = typeof Fixtures !== "undefined" ? Fixtures : {};

Fixtures.actionPlansFixture = [
  {
    name: "Test Action Plan",
    description: "An action plan for testing",
    milestone_ids: [],
    isComplete: false
  },
  {
    name: "Test Completed Action Plan",
    description: "A completed action plan for testing",
    milestone_ids: [],
    isComplete: true
  }
];

Fixtures.milestonesFixture = [
  {
    title: "Test Boilerplate",
    motivation: "Get shit started",
    subtask_ids: [],
    tags: ['boilerplate', 'python']
  },
  {
    title: "Another Test",
    motivation: "Figure out some html",
    subtask_ids: [],
    tags: ['boilerplate', 'python']
  },
  {
    title: "Moar Tests",
    motivation: "How bout some Javascript",
    subtask_ids: [],
    tags: ['boilerplate', 'python']
  }
];

Fixtures.subtasksFixture = [
  {
    description: "Set up site",
    link_ids: [],
    milestone_ids: [],
  },
  {
    description: "More set up stuff",
    link_ids: [],
    milestone_ids: [],
  },
  {
    description: "Last subtask- you're done!",
    link_ids: [],
    milestone_ids: [],
  }
];

Fixtures.linksFixture = [
  {
    url: "www.google.com",
    subtask_ids: [],
    milestone_ids: [],
  },
  {
    url: "nikhilpi.com",
    subtask_ids: [],
    milestone_ids: [],
  },
  {
    url: "www.northwestern.edu",
    subtask_ids: [],
    milestone_ids: [],
  }
];