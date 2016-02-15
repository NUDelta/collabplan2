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

    }
});