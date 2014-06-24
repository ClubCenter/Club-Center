Notifications = new Meteor.Collection('notifications');

Notifications.allow({

	update: isOwner
});

createCommentNotification = function(comment){
	var post = Posts.findOne(comment.postId);
	if(comment.userId !== post.userId) {
		Notifications.insert({
			userId: post.userId,
			postId: post._id,
			commentId: comment._id,
			commenterName: comment.author,
			type: "comment",
			read: false
		});
	};
};

createAnswerNotification = function(answer){
	var question = Questions.findOne(answer.questionId);
	console.log(question);
	if(answer.userId !== question.userId) {
		Notifications.insert({
			userId: question.userId,
			postId: question._id,
			commentId: answer._id,
			commenterName: answer.author,
			type: "answer",
			read: false
		})
	};
};

