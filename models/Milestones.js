Milestones = new Mongo.Collection('Milestones');

Schema.MilestonesSchema = new SimpleSchema({
  title: {
    type: String,
    optional: true
  },
  motivation: {
    type: String,
    optional: true
  },
  subtask_ids: {
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
  },
  tags: {
    type: [String],
    optional: true
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

  Milestones._ensureIndex({
    "title": "text",
    "motivation": "text",
  });
}
