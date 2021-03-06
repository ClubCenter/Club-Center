Template.questionEdit.helpers({
	question: function() {
		return Questions.findOne(Session.get('currentQuestionId'));
	}
});

Template.questionEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		var currentQuestionId = this._id;
		var a = Date.now();
		//console.log(this._url);
		var questionProperties = {
			message: $(e.target).find('[name=message]').val(),
			title: $(e.target).find('[name=title]').val(),
			latestUpdate: a
		}
		
		Questions.update(currentQuestionId, {$set: questionProperties}, function(error) {
			if (error) {
				// display the error to the user
				throwError(error.reason);
			} else {
				Router.go('questionPage', {_id: currentQuestionId});
			}
		});
	},
	'click .delete': function(e) {
		e.preventDefault();
		if (confirm("Delete this question?")) {
			var currentQuestionId = this._id
			Questions.remove(currentQuestionId);
			Router.go('questionsList');
		}
	}
});
