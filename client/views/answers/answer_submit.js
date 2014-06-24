Template.answerSubmit.events({
	'submit form': function(e, template) {
		e.preventDefault();
		var $body = $(e.target).find('[name=body]');
		var answer = {
			body: $body.val(),
			questionId: template.data._id
		};
		console.log(answer.questionId);
		Meteor.call('answer', answer, function(error, answerId) {
			if (error){
				throwError(error.reason);
			} else {
				console.log(answerId);
				$body.val('');
			}
		});
	}
});
