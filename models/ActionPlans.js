ActionPlans = new Mongo.Collection('ActionPlans');
Schema = {};
Schema.ActionPlansSchema = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  prior_knowledge: {
    type: String
  },
  requested_frameworks: {
    type: String
  },
  author_id: {
    type: String,
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
    }
  });
}
