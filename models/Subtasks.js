Subtasks = new Mongo.Collection('Subtasks');

Schema.SubtasksSchema = new SimpleSchema({
  description: {
    type: String
  },
  links: {
    type: [String]
  },
  milestone_ids: {
    type: [String]
  },
  createdAt: {
    type: Date,
    denyUpdate: true
  }
});

Subtasks.attachSchema(Schema.SubtasksSchema);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Subtasks.allow({
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
