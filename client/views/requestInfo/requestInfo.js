Template['requestInfo'].helpers({
    request_user_skills: function (user_id) {
        return Meteor.users.findOne({_id: user_id}).profile.skills;
    }
});

Template['requestInfo'].events({
});
