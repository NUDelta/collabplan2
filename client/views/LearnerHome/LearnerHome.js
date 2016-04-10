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
            	{ 
            		key:'name', 
            		label: 'Name'
            	},
            	{ 
            		key:'isComplete', 
            		label: 'Status',
            		fn: function (value) { 
            			return value ? 'Ready' : 'Pending'
            		}

            	},
            	{ 
            		key:'createdAt', 
            		label: 'Submit Date',
            		fn: function (value) {
            			return moment(value).calendar()
            		}
            	},
            	{ 
            		key: 'modifiedAt',
            		label: 'Last Modified',
            		fn: function (value) {
            			return moment(value).calendar()
            		}
            	}
            	
            ]
        };
    }
});

Template['LearnerHome'].events({
  'click .reactive-table tbody tr': function (event) {
    console.log("It worked");
    var post = this;
    Session.set('post', post);
    console.log(this);

    Router.go('action_plans.show', {_id: this._id})
  }
});
