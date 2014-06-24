Messages = new Meteor.Collection("messages");

Meteor.methods({
	forumPost: function(forumPostAttributes) {
		var user = Meteor.user();
		//var post = Posts.findOne(commentAttributes.postId);
// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to make comments");
		if (!forumPostAttributes.text)
			throw new Meteor.Error(422, 'Please write some content');
		
		forumPost = _.extend(_.pick(forumPostAttributes, 'text', 'date', 'forumId'), {
			//userId: user._id,
			//forumNum: forumPostAttributes.forumNum,
			author: user.username,
			//submitted: new Date().getTime()

		});


	Messages.insert(forumPost)
	return " ";
	}
});