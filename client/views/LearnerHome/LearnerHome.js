Template['LearnerHome'].helpers({
	user_pending_action_plans: function () {
        return ActionPlans.find({isComplete: false, requester_id: Meteor.userId()}, {sort: { name: 1 }})
    },
    user_complete_action_plans: function () {
        return ActionPlans.find({isComplete: true, requester_id: Meteor.userId()}, {sort: { name: 1 }})
    },

    settings: function () {
        return {
            collection: ActionPlans,
            rowsPerPage: 10,
            showFilter: true,
            fields: [
            	{ key:'name', label: 'Name' },
            	{ 
            		key:'isComplete', 
            		label: 'Status',
            		fn: function (value) { 
            			// if (value)  {return 'Ready'}
            			// else 		{return 'Pending'}; 
            			return value ? 'Ready' : 'Pending'
            		}

            	},
            	{ 
            		key:'createdAt', 
            		label: 'Submit Date',
            		fn: function (value) {
            			console.log(value)
            			return moment(value).calendar()
            		}
            	},
            	{ key:'createdAt', label: 'Progress' }
            ]
        };
    }
});

Template['LearnerHome'].events({
});
