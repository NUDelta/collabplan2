ActionPlans = new Mongo.Collection('ActionPlans');
Schema = {};
Schema.ActionPlansSchema = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  author_id: {
    type: String
  },
  requester_id: {
    type: String
  },
  milstones: {
    type: [String]
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