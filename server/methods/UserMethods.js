Meteor.methods({
    user_toggle_subtasks_completion: function (ap_id, st_id) {
        var user = Meteor.users.findOne(this.userId);
        var all_progress = user.profile.progress || {}
        var ap_progress = all_progress[ap_id] || [];
        
        if (ap_progress.indexOf(st_id) === -1) {
            var update = {$addToSet: {}}
            update.$addToSet['profile.progress.'+ap_id] = st_id;
            Meteor.users.update({_id: this.userId}, update)
        } else {
            var update = {$pull: {}}
            update.$pull['profile.progress.'+ap_id] = st_id;
            Meteor.users.update({_id: this.userId}, update)
        }

    },
    user_progress_on_action_plan: function(ap_id) {
        var user = Meteor.users.findOne(this.userId);
        var all_progress = user.profile.progress || {}
        var ap_progress = all_progress[ap_id] || [];

        var action_plan = ActionPlans.findOne(ap_id);
        var mile_stones = Milestones.find({ _id: { $in: action_plan.milestone_ids } }).fetch();

        var sb_count = 0;
        for (var i = mile_stones.length - 1; i >= 0; i--) {
            var ms = mile_stones[i];
            sb_count += ms.subtask_ids.length;
        };

        return Math.floor(ap_progress.length/sb_count * 100);
    },
    user_add_skill: function(skill) {
        Meteor.users.update({_id: this.userId}, {
            $addToSet: {
                'profile.skills': {
                    name: skill.name, 
                    level: 1
                }
            }
        });
    },
    user_update_profile: function(profile) {
        Meteor.users.update({_id: this.userId}, {
            $set: {
                'profile.first_name': profile.first_name
                'profile.last_name': profile.last_name,
                'emails.0.address': profile['emails.0.address']
            }
        });
    },
    user_update_skills: function(skills) {
        Meteor.users.update({_id: this.userId}, {
            $set: {'profile.skills': skills}
        });
    }
});