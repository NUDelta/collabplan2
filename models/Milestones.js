Milestones = new Mongo.Collection('Milestones');

Schema.MilestonesSchema = new SimpleSchema({
  title: {
    type: String
  },
  motivation: {
    type: String
  },
  subtask_ids: {
    type: [String]
  },
  createdAt: {
    type: Date,
    denyUpdate: true
  }
});

Milestones.attachSchema(Schema.MilestonesSchema);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Milestones.allow({
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
