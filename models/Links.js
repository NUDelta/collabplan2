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
    denyUpdate: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }  
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
