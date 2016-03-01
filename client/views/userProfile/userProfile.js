Template['userProfile'].helpers({
    user: function(){
        return Meteor.user();
    },
    is_selected: function(val) {
        return val === this.level ? 'checked':'';
    },
    info_saved: function() {
        return Session.get('info_saved');
    }
});

Template['userProfile'].events({
    'submit #add_skills_form': function(event){
        event.preventDefault();

        var skill =  {
            name: event.target.skill_name.value,
        };

        Meteor.call('user_add_skill', skill)
    },
    'submit #info_form': function(event){
        event.preventDefault();

        var profile =  {
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            'emails.0.address': event.target.email.value,
        };

        Meteor.call('user_update_profile', profile, function(err){
            if (!err) {
                Session.set('info_saved',true)
            }
        })
    }
    ,
    'submit #skills_form': function(event){
        event.preventDefault();
        var user = Meteor.user();
        var skills = user.profile.skills;

        for (var i = skills.length - 1; i >= 0; i--) {
            skills[i].level = parseInt(event.target[skills[i].name].value);
        };

        Meteor.call('user_update_skills', skills, function(err){
            if (!err) {
                Session.set('skills_saved',true)
            }
        })
    },
    'click .remove_skill': function(event){
        event.preventDefault();
        var user = Meteor.user();
        var skills = user.profile.skills;
        var target = this.name;
        
        skills = skills.filter(function(skill){
            return skill.name != target;
        })

        Meteor.call('user_update_skills', skills)
    }
});
