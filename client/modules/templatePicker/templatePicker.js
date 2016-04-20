Template['templatePicker'].helpers({
    templates: function () {
        return [
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
        ]
    }
});

Template['templatePicker'].events({
    'click .select_template': function(e) {
        var template = this;
        
    }
});
