Schema.UserProfileSchema = new SimpleSchema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  skills: {
    type: [String]
  },
  action_plan_ids: {
    type: [String]
  }
});

Schema.UsersSchema = new SimpleSchema({
  username: {
    type: String,
    optional: true,
  },
  emails: {
    type: [Object],
    optional: true,
    defaultValue: [],
    minCount: 0,
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: {
    type: Date,
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
  profile: {
    type: Schema.UserProfileSchema,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  }
});

Meteor.users.attachSchema(Schema.UsersSchema);