ActionPlans = new Mongo.Collection('ActionPlans');

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
  }
  createdAt: {
    type: Date,
    denyUpdate: true
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
