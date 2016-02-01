Template['actionPlanView'].helpers({
	action_plan: function () {
        var id = Router.current().params._id;
        return ActionPlans.findOne({_id: id});
    },
    get_milestones: function (id) {
    	var ms = {
    		'abc': {
			    title: "Milestone #1",
			    motivation: "Get shit started",
			    subtask_ids: ['def'],
			    tags: ['boilerplate', 'python']
			  },
			 'abc1': {
			    title: "Milestone #2",
			    motivation: "To figure out some html",
			    subtask_ids: ['def1', 'def2'],
			    tags: ['boilerplate', 'python']
			  },
			  'abc2':{
			    title: "Milestone #3",
			    motivation: "How bout to learn some Javascript",
			    subtask_ids: ['def2'],
			    tags: ['boilerplate', 'python']
			  }
    	}

    	return ms[id]
    },
	get_subtasks: function (id) {
    	var ms = {
    		'def': {
			    description: "Set up site",
		    	link_ids: ['ghi'],
		    	milestone_ids: ['abc'],
			  },
			'def1': {
			    description: "Set up other site",
		    	link_ids: ['ghi1'],
		    	milestone_ids: ['abc1'],
			  },
			'def2': {
			    description: "Set up a third site",
		    	link_ids: ['ghi2'],
		    	milestone_ids: ['abc2'],
			  },
    	}

    	return ms[id]
    },
    get_links: function (id) {
    	var ms = {
    		'ghi': {
		    	url: "www.google.com",
		    	subtask_ids: ['def'],
		  	  	milestone_ids: ['abc'],
		  	  },
			 'ghi1': {
			    url: "nikhilpi.com",
    			subtask_ids: ['def1'],
    			milestone_ids: ['abc1'],
			  },
			  'ghi2': {
			     url: "www.northwestern.edu",
    			subtask_ids: ['def2'],
    			milestone_ids: ['abc2'],
			  },
    	}

    	return ms[id]
    },


    action_plan_test: function() {
    	return {
		    name: "Test Action Plan",
		    description: "An action plan for testing",
		    milestone_ids: ['abc','abc1', 'abc2'],
		    isComplete: false
		  }
    }

});

Template['actionPlanView'].events({
});
