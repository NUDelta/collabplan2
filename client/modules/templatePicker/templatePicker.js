Template['templatePicker'].helpers({
    templates: function () {
        return [
            {
                name: "Community sharing template",
                description: "An action plan for a webapp that allows users to create items and share items. This is framework agnostic and assumes a MVC model with a database.",
                isComplete: false,
                author_id: '',
                requester_id: '',
                milestone_ids: [
                  {
                    title: "Create model for item to be shares",
                    motivation: "The site needs to store the items created by users. By the end of this milestone, you will have setup a database and stored some fake data in there.",
                    tags: [],
                    subtask_ids: [
                      {
                        description: "Define a schema with the atrributes needed for the item",
                        milestone_ids: [],
                        links: []
                      },
                      {
                        description: "Create the database to hold the items",
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
                    title: "Create page to show all items",
                    motivation: "This page will be the feed of all items users have created. Eventually it will link out to detail pages for the items and the author profiles.",
                    tags: [],
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
                      }
                    ],
                  },
                  {
                    title: "Create page to create items",
                    motivation: "Users need to be able to create items. This page will have a form for creating items according to the schema you defined before. At this point, anyone who visites your site can create an item without being logged in.",
                    tags: [],
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
                        description: "Add html form to template with inputs based on your schema",
                        milestone_ids: [],
                        links: []
                      },
                      {
                        description: "Add an event handler on form submit that inserts the new item into the database",
                        milestone_ids: [],
                        links: []
                      }
                    ],
                  },
                  {
                    title: "Create page to view a single item",
                    motivation: "Users need to be able to view specific items. This page will be a template to show any item based on route. The route will specify with item to show.",
                    tags: [],
                    subtask_ids: [
                      {
                        description: "Create template and controller files",
                        milestone_ids: [],
                        links: []
                      },
                      {
                        description: "Add route to show page based item id, like /item/:id",
                        milestone_ids: [],
                        links: []
                      },
                      {
                        description: "Query single item from database using route id",
                        milestone_ids: [],
                        links: []
                      },
                      {
                        description: "Add content from database to template",
                        milestone_ids: [],
                        links: []
                      },
                      {
                        description: "Edit all items view to have each item link to their respective view",
                        milestone_ids: [],
                        links: []
                      }
                    ],
                  },
                ],
            }
        ]
    }
});

Template['templatePicker'].events({
    'click .select_template': function(e) {
        var template = this;
        var ap = Template.currentData();
        Meteor.call('action_plan_select_template', template, ap._id);
    }
});
