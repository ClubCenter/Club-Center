Answers = new Meteor.Collection('answers');

Answers.allow({
	update: ownsDocument,
	remove: ownsDocument

});
Answers.deny({
	update: function(userId,answer, fieldNames){

		//return (_.without(fieldNames, 'body').length > 1);
	}

});
Meteor.methods({
	answer: function(answerAttributes) {
		var user = Meteor.user();
		var question = Questions.findOne(answerAttributes.questionId);
// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to give an answer");
		if (!answerAttributes.body)
			throw new Meteor.Error(422, 'Please write some content');
		if (!answerAttributes.questionId)
			throw new Meteor.Error(422, 'You must answer on a question');
		answer = _.extend(_.pick(answerAttributes, 'questionId', 'body'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});
	Questions.update(answer.questionId, {$inc: {answersCount: 1}, $set: {latestUpdate: Date.now()}});
	answer._id = Answers.insert(answer);
	createAnswerNotification(answer);
	return answer._id;
	}
});
