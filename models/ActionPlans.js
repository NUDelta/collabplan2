ActionPlans = new Mongo.Collection('ActionPlans');
Schema = {};
Schema.ActionPlansSchema = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  build_milestones: {
    type: String
  },
  steps: {
    type: String
  },
  affordances: {
    type: String
  },
  min_functionality: {
    type: String
  },
  reference_work: {
    type: String
  },
  requested_skills: {
    type: [String]
  },
  author_id: {
    type: String,
    optional: true
  },
  author_ids: {
    type: [String],
    optional: true
  },
  requester_id: {
    type: String
  },
  milestone_ids: {
    type: [String]
  },
  isComplete: {
    type: Boolean,
    defaultValue: false
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    },
  },
  modifiedAt: {
    type: Date,
    optional: true
  }

});

ActionPlans.attachSchema(Schema.ActionPlansSchema);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  ActionPlans.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    },
    
  });

  ActionPlans._ensureIndex({
    "name": "text",
    "description": "text",
    "affordances": "text"
  });
}

ActionPlans.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = Date.now();
    });

