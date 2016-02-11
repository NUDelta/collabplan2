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
        tags: ['python'],
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


Fixtures.milestonesFixture = [
  {
    title: "Static HTML Boilerplate",
    motivation: "You can create a basic website with these three files. Index.html for HTML, scripts.js for javascript and styles.css for CSS.",
    subtask_ids: [
      {
            description: "Download files",
            milestone_ids: [],
            links: ['https://dl.dropboxusercontent.com/u/7941670/Static%20HTML%20Boiler%20Plate.zip']
          },
          {
            description: "Open all three files in a text editor. Sublime is recommended",
            milestone_ids: [],
            links: ['https://www.sublimetext.com/']
          },
          {
            description: "Open index.html in a web browser. You should see a page that says Hello World",
            milestone_ids: [],
            links: []
          },
    ],
    tags: ['boilerplate', 'static', 'html']
  },
  {
    title: "Node + Bootstrap + Handlebars Boilerplate",
    motivation: "This is a basic Node.js web application. You can use it to build templated websites.",
    subtask_ids: [
      {
        description: "Download files",
        milestone_ids: [],
        links: ['https://dl.dropboxusercontent.com/u/7941670/Node%20%2B%20Handlebars%20%2B%20bootstrap.zip']
      },
      {
        description: "Install node.js",
        milestone_ids: [],
        links: ['https://nodejs.org/en/']
      },
      {
        description: "Install grunt",
        milestone_ids: [],
        links: ['http://gruntjs.com/installing-grunt']
      },
      {
        description: "Open all three files in a text editor. Sublime is recommended",
        milestone_ids: [],
        links: ['https://www.sublimetext.com/']
      },
      {
        description: "In terminal, cd to the application folder and type `grunt`. Then visit localhost:3000",
        milestone_ids: [],
        links: ['http://localhost:3000/']
      },
    ],
    tags: ['boilerplate', 'node', 'grunt', 'bootstrap', 'handlebars']
  },
];
