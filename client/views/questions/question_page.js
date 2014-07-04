Template.questionPage.helpers({
	answers: function() {

		Meteor.subscribe('singleQuestion',Session.get("currentQuestion"));
		return Answers.find({questionId: Session.get("currentQuestion")});
	},
	message: function(){
		Meteor.subscribe('singleQuestion',Session.get("currentQuestion"));
		return this._id.message;
	}

});

Template.questionPage.rendered=function()
{
	Meteor.subscribe('singleQuestion',this._id);
}