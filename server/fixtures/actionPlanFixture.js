// The "||" notation doesn't work yet
Fixtures = typeof Fixtures !== "undefined" ? Fixtures : {};

Fixtures.actionPlansFixture = [
  {
    author_ids: ["admin"],
    requester_id: "test1",
    isComplete: false,
    affordances: "Some affordances",
    build_milestones: "Some milestone ideas",
    description: "To build something",
    min_functionality: "To work",
    name: "Sample blank (not complete, test1/admin)",
    reference_work: "test.com",
    requested_skills: ["mongodb", "Meteor", "js", "css", "html"],
    steps: "1. build 2. profit",
    milestone_ids: [
      {
        title: "Test Milestone",
        motivation: "Some motivation",
        tags: [''],
        subtask_ids: [
          {
            description: "Sample subtask 1",
            milestone_ids: [],
            links: ['test.com']
          },
          {
            description: "Sample subtask 2, no link",
            milestone_ids: [],
            links: []
          },
        ],
      },
    ],
  },
  {
    author_ids: ["admin"],
    requester_id: "test1",
    isComplete: false,
    affordances: "follow/ unfollow people, upload images, write posts, see ,people's profiles",
    build_milestones: "Start with making some kind of database, create a page ,where only myself can post to, then make profiles and allow more than one user to post. Later add images or links.",
    description: "I want to make a blogging site where people can write posts ,and they appear on a common newsfeed. The posts should be sorted by time of submitting, and I should be able to see who wrote each post.",
    min_functionality: "a user can write a post and see it appear on a screen.",
    name: "A blogging website (not complete, test1/admin)",
    reference_work: "Tumblr, Twitter",
    requested_skills: ["mongodb", "Meteor", "js", "css", "html"],
    steps: "Logs in -> Sees common page (newsfeed) -> At the top of the page, ,sees a 'write post' option -> writes post in separate page -> can go back to newsfeed and see her post -> can go to profile page",
    milestone_ids: [
      {
        title: "Create blog model",
        motivation: "The site needs to store the items created by users. By the end of this milestone, you will have setup a database and stored some fake data in there.",
        tags: [''],
        subtask_ids: [
          {
            description: "Add a meteor collection for Blogs",
            milestone_ids: [],
            links: []
          },
          {
            description: "Define a schema for each object. This won’t be coded but you should know what keys each object will have. For example, title, description, date.",
            milestone_ids: [],
            links: []
          },
          {
            description: "Add dummy data for the items so that you have something to work with.",
            milestone_ids: [],
            links: []
          },
        ],
      },
      {
        title: "Create view that display all blog posts",
        motivation: "This page will be the feed of all items users have created. Eventually it will link out to detail pages for the items and the author profiles.",
        tags: [''],
        subtask_ids: [
          {
            description: "Create template and controller files",
            milestone_ids: [],
            links: []
          },
          {
            description: "Add route to show page",
            milestone_ids: [],
            links: []
          },
          {
            description: "Query all items from database in controller",
            milestone_ids: [],
            links: []
          },
          {
            description: "Display all items by creating a loop in the template to render the item content",
            milestone_ids: [],
            links: []
          },
        ],
      },
      {
        title: "Create view with form to write blog posts",
        motivation: "Users need to be able to create items. This page will have a form for creating items according to the schema you defined before. At this point, anyone who visites your site can create an item without being logged in.",
        tags: [''],
        subtask_ids: [
          {
            description: "Create template and controller files",
            milestone_ids: [],
            links: []
          },
          {
            description: "Add route to show page (like /compose)",
            milestone_ids: [],
            links: []
          },
          {
            description: "Add html form to template",
            milestone_ids: [],
            links: []
          },
          {
            description: "Add event handler for form submit that inserts new blog post into blog collection",
            milestone_ids: [],
            links: []
          },
        ],
      },
      {
        title: "Create view to display single blog post",
        motivation: "Users need to be able to view specific items. This page will be a template to show any item based on route. The route will specify with item to show.",
        tags: [''],
        subtask_ids: [
          {
            description: "Create template and controller files",
            milestone_ids: [],
            links: []
          },
          {
            description: "Add route to show page (like /blog/:id)",
            milestone_ids: [],
            links: []
          },
          {
            description: "Create helper that gets specific blog post for the page based on the id",
            milestone_ids: [],
            links: []
          },
          {
            description: "Add content from helper to template",
            milestone_ids: [],
            links: []
          },
          {
            description: "Edit all blog post view to have each blog post link to their respective view",
            milestone_ids: [],
            links: []
          },
        ],
      },
    ],
  },
  {
    author_ids: ["test1"],
    requester_id: "admin",
    isComplete: true,
    affordances: "follow/ unfollow people, upload images, write posts, see ,people's profiles",
    build_milestones: "Start with making some kind of database, create a page ,where only myself can post to, then make profiles and allow more than one user to post. Later add images or links.",
    description: "I want to make a blogging site where people can write posts ,and they appear on a common newsfeed. The posts should be sorted by time of submitting, and I should be able to see who wrote each post.",
    min_functionality: "a user can write a post and see it appear on a screen.",
    name: "A blogging website (complete, admin/test1)",
    reference_work: "Tumblr, Twitter",
    requested_skills: ["mongodb", "Meteor", "js", "css", "html"],
    steps: "Logs in -> Sees common page (newsfeed) -> At the top of the page, ,sees a 'write post' option -> writes post in separate page -> can go back to newsfeed and see her post -> can go to profile page",
    milestone_ids: [
      {
        title: "Create blog model",
        motivation: "The site needs to store the items created by users. By the end of this milestone, you will have setup a database and stored some fake data in there.",
        tags: [''],
        subtask_ids: [
          {
            description: "Add a meteor collection for Blogs",
            milestone_ids: [],
            links: []
          },
          {
            description: "Define a schema for each object. This won’t be coded but you should know what keys each object will have. For example, title, description, date.",
            milestone_ids: [],
            links: []
          },
          {
            description: "Add dummy data for the items so that you have something to work with.",
            milestone_ids: [],
            links: []
          },
        ],
      },
      {
        title: "Create view that display all blog posts",
        motivation: "This page will be the feed of all items users have created. Eventually it will link out to detail pages for the items and the author profiles.",
        tags: [''],
        subtask_ids: [
          {
            description: "Create template and controller files",
            milestone_ids: [],
            links: []
          },
          {
            description: "Add route to show page",
            milestone_ids: [],
            links: []
          },
          {
            description: "Query all items from database in controller",
            milestone_ids: [],
            links: []
          },
          {
            description: "Display all items by creating a loop in the template to render the item content",
            milestone_ids: [],
            links: []
          },
        ],
      },
      {
        title: "Create view with form to write blog posts",
        motivation: "Users need to be able to create items. This page will have a form for creating items according to the schema you defined before. At this point, anyone who visites your site can create an item without being logged in.",
        tags: [''],
        subtask_ids: [
          {
            description: "Create template and controller files",
            milestone_ids: [],
            links: []
          },
          {
            description: "Add route to show page (like /compose)",
            milestone_ids: [],
            links: []
          },
          {
            description: "Add html form to template",
            milestone_ids: [],
            links: []
          },
          {
            description: "Add event handler for form submit that inserts new blog post into blog collection",
            milestone_ids: [],
            links: []
          },
        ],
      },
      {
        title: "Create view to display single blog post",
        motivation: "Users need to be able to view specific items. This page will be a template to show any item based on route. The route will specify with item to show.",
        tags: [''],
        subtask_ids: [
          {
            description: "Create template and controller files",
            milestone_ids: [],
            links: []
          },
          {
            description: "Add route to show page (like /blog/:id)",
            milestone_ids: [],
            links: []
          },
          {
            description: "Create helper that gets specific blog post for the page based on the id",
            milestone_ids: [],
            links: []
          },
          {
            description: "Add content from helper to template",
            milestone_ids: [],
            links: []
          },
          {
            description: "Edit all blog post view to have each blog post link to their respective view",
            milestone_ids: [],
            links: []
          },
        ],
      },
    ],
  },
  {
    author_ids: ["test1"],
    requester_id: "admin",
    isComplete: false,
    affordances: "follow/ unfollow people, upload images, write posts, see ,people's profiles",
    build_milestones: "Start with making some kind of database, create a page ,where only myself can post to, then make profiles and allow more than one user to post. Later add images or links.",
    description: "I want to make a blogging site where people can write posts ,and they appear on a common newsfeed. The posts should be sorted by time of submitting, and I should be able to see who wrote each post.",
    min_functionality: "a user can write a post and see it appear on a screen.",
    name: "A blogging website (request, admin/)",
    reference_work: "Tumblr, Twitter",
    requested_skills: ["mongodb", "Meteor", "js", "css", "html"],
    steps: "Logs in -> Sees common page (newsfeed) -> At the top of the page, ,sees a 'write post' option -> writes post in separate page -> can go back to newsfeed and see her post -> can go to profile page",
    milestone_ids: []
  }
];


Fixtures.milestonesFixture = [
];
