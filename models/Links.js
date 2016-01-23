Links = new Mongo.Collection('Links');

Schema.LinksSchema = new SimpleSchema({
  url: {
    type: String
  },
  subtask_ids: {
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

Links.attachSchema(Schema.LinksSchema);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Links.allow({
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
