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
    autoform: {
      omit: true
    }
  },
  profile: {
    type: Schema.UserProfileSchema,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
    autoform: {
      omit: true
    }
  }
});

Meteor.users.attachSchema(Schema.UsersSchema);