Template['ComposerHome'].helpers({
    isFilter: function(filter){
      return Session.get('filter') === filter;
    },

    settings_current: function () {
        return {
            collection: ActionPlans.find({isComplete: false, author_id: Meteor.userId()}),
            noDataTmpl: Template.noDataExpertCurrent,
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
    },

    settings_potential: function () {
        return {
            collection: ActionPlans.find({isComplete: false, author_id: null}),
            noDataTmpl: Template.noDataExpertPotential,
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
    },

    settings_completed: function () {
        return {
            collection: ActionPlans.find({isComplete: true, author_id: Meteor.userId()}),
            noDataTmpl: Template.noDataExpertCompleted,
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

Template['ComposerHome'].events({
	'click .reactive-table tbody tr': function (event) {
    var post = this;
    Session.set('post', post);
    console.log(this);

    Router.go('action_plans.show', {_id: this._id});
    
  },

  'click .current': function (event) {
  	Session.set('filter', 'current');
  },
  'click .potential': function (event) {
  	Session.set('filter', 'potential');
  },
  'click .completed': function (event) {
  	Session.set('filter', 'completed');
  }

});

Template['ComposerHome'].onRendered(function () {
	Session.set('filter', 'current');
});
