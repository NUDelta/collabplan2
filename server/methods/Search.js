Meteor.methods({
    'subtask_search': function (keyword) {
        return collection_text_search(Subtasks,keyword).fetch();
    },
    'milestone_search': function (keyword) {
        return collection_text_search(Milestones,keyword).fetch();
    },
    'milestone_search_recur': function (keyword) {
        var milestones = collection_text_search(Milestones,keyword).fetch();
        var milestones_from_sb = milestone_search_from_subtasks(keyword).fetch();
        return milestones.concat(milestones_from_sb);
    },
    'actionplan_search': function (keyword) {
        return collection_text_search(ActionPlans,keyword).fetch();
    },
    'recipe_search': function (keyword) {
        return collection_text_search(Recipes,keyword).fetch();
    },
    'ap_and_rep_search': function(keyword) {
        return ap_and_rep_search_from_milestones(keyword);
    }

});

var collection_text_search = function(collection_type, keyword) {
    if (!keyword) {return collection_type.find({});}

    var cursor =  collection_type.find(
        { $text: {$search: keyword} },
        {
            fields: {
                score: { $meta: "textScore" }
            },
            sort: {
                score: { $meta: "textScore" }
            }
        }
    );
    return cursor;
}

var convert_cursor_to_id = function(cursor) {
    return cursor.map(function(doc){
        return doc._id;
    })
}

var milestone_search_from_subtasks = function(keyword) {
    var subtask_ids = convert_cursor_to_id(collection_text_search(Subtasks,keyword));
    return Milestones.find(
        { subtask_ids: { $in: subtask_ids }  }
    ).fetch();
}

var ap_and_rep_search_from_milestones = function(keyword) {
    if (keyword.length < 1) return [];
    var ms_ids = convert_cursor_to_id(collection_text_search(Milestones,keyword));
    
    // Search milestones by subtask content
    // ms_ids = ms_ids.concat(milestone_search_from_subtasks(keyword).map(function(doc){
    //     return doc._id;
    // }));

    return ActionPlans.find(
            { milestone_ids: { $in: ms_ids }  }
        ).fetch()
        .concat(
            Recipes.find(
                { milestone_ids: { $in: ms_ids }  }
            ).fetch()
        )
        .concat(
            collection_text_search(ActionPlans,keyword).fetch()
        );
}
