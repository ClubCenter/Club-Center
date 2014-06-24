Forums = new Meteor.Collection('forums');

Forums.allow({
	remove: function(){
		return true;
	}
});

Meteor.methods({
	newForum: function(forumAttributes){


		newForum = _.extend(_.pick(forumAttributes, 'title'),{

		});

		var forumID = Forums.insert(newForum);
		return forumID;
	}

	
});