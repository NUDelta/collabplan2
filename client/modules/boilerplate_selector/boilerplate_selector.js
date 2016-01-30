Template['boilerplate_selector'].helpers({
    boiler_plate_milestones: function(){
        return Milestones.find({tags: {$in: ['boilerplate']}});
    }
});

Template['boilerplate_selector'].events({
});
