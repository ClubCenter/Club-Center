Questions = new Meteor.Collection('questions');

Questions.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Questions.deny({
	update: function(userId,question, fieldNames){

		return (_.without(fieldNames,'title', 'message').length > 1);
	}

});
Meteor.methods({
	question: function(questionAttributes){
		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error(401, "You need to login to ask question");

		if(!questionAttributes.title)
			throw new Meteor.Error(422, 'Please add title');

		

		var question = _.extend(_.pick(questionAttributes, 'title', 'message'),{
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime(),
			latestUpdate: new Date().getTime(),
			answersCount:0
		});
		var questionId = Questions.insert(question);

		return questionId;
	}	
});