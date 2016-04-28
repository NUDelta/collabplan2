Template['requestInfoModal'].helpers({
    request_user_skills: function (user_id) {
        Meteor.users.findOne({_id: user_id}).profile.skills;
    }
});

Template['requestInfoModal'].events({
});
