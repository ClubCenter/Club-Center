Posts = new Meteor.Collection('posts');

Posts.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Posts.deny({
	update: function(userId,post, fieldNames){

		return (_.without(fieldNames,'title', 'message','pinned').length > 1);
	}

});
Meteor.methods({
	post: function(postAttributes){
		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error(401, "You need to login to post");

		if(!postAttributes.title)
			throw new Meteor.Error(422, 'Please add title');

		

		var post = _.extend(_.pick(postAttributes, 'title', 'message', 'pinned'),{
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime(),
			commentsCount:0
		});
		var postId = Posts.insert(post);

		return postId;
	}	
});