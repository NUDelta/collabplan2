Skills = new Mongo.Collection('Skills');

Schema.SkillsSchema = new SimpleSchema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  createdAt: {
    type: Date,
    denyUpdate: true
  }
});

Skills.attachSchema(Schema.SkillsSchema);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Skills.allow({
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
