Meteor.publish('posts', function(limit){

	return Posts.find({}, { limit: limit , sort: { pinned: -1, submitted : -1} });
});

Meteor.publish('comments', function(postId){

	return Comments.find({postId: postId});

});

Meteor.publish('notifications', function(){
	return Notifications.find({userId: this.userId});

});

Meteor.publish('questions', function(limit){
	//return Questions.find({},{limit: limit});
	return Questions.find({}, { limit: limit , sort: {latestUpdate: -1} });
});

Meteor.publish('answers', function(questionId){

	return Answers.find({questionId: questionId});
});

Meteor.publish('messages', function(forumId){
	return Messages.find({forumId: forumId });
});

Meteor.publish('forums', function(){
	return Forums.find();
});

Meteor.publish("accountsData", function () {
 
    return Meteor.users.find({},
                             {fields: {'username': 1, 'emails': 1}});
 
    
});

Meteor.publish("products", function(){
	return Products.find();
});

Meteor.publish("payments", function(){
	return PaypalPayments.find({state: 'approved'});
});

Meteor.publish("invoices", function(){
	return Invoices.find();
});

Meteor.publish("singlePost", function(postId){
	//console.log(postId);
	//cursor.rewind();
	return Posts.find({_id: postId});
});

Meteor.publish("singleQuestion", function(questionId){

	return Questions.find({_id: questionId});
})
