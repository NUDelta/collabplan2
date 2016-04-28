Template['LearnerHome'].helpers({
    settings: function () {
        return {
            collection: ActionPlans.find({requester_id: Meteor.userId()}),
            noDataTmpl: Template.noDataLearner,
            rowsPerPage: 10,
            showFilter: true,
            showNavigationRowsPerPage: false,
            fields: [
            	{ 
            		key:'name', 
            		label: 'Name'
            	},
            	{ 
            		key:'isComplete', 
            		label: 'Status',
            		sortOrder: 0,
            		sortDirection: -1,
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
    var post = this;
    Session.set('post', post);
    console.log(this);

    Router.go('action_plans.show', {_id: this._id})
  }
});
