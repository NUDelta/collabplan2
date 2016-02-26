Schema.UserProfileSchema = new SimpleSchema({
  first_name: {
    type: String,
    optional: true,
  },
  last_name: {
    type: String,
    optional: true,
  },
  skills: {
    type: [Object],
    optional: true,
  },
  'skills.$.name': {
    type: String
  },
  'skills.$.level': {
    type: number
  },
  action_plan_ids: {
    type: [String],
    optional: true,
  },
  progress: {
    type: Object,
    optional: true,
    blackbox: true
  },

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
    regEx: SimpleSchema.RegEx.Email,
    optional: true,
  },
  "emails.$.verified": {
    type: Boolean,
    optional: true,
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