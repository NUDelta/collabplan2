Recipes = new Mongo.Collection('Recipes');
Schema = {};
Schema.RecipesSchema = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  milestone_ids: {
    type: [String]
  },
  tags: {
    type: [String]
  },
  parent_id: {
    type: String,
    optional: true
  },
  children_ids: {
    type: [String],
    optional: true
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

Recipes.attachSchema(Schema.RecipesSchema);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Recipes.allow({
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
}
