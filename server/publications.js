Meteor.publish('posts', function(options){

	return Posts.find();
});

Meteor.publish('comments', function(postId){

	return Comments.find({postId: postId});

});

Meteor.publish('notifications', function(){
	return Notifications.find({userId: this.userId});

});

Meteor.publish('questions', function(){
	return Questions.find();
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
})
