Template.questionPage.helpers({
	answers: function() {
		return Answers.find({questionId: Session.get("currentQuestion")});
	},
	message: function(){
		return this._id.message;
	}

});
