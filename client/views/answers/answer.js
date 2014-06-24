Template.answer.helpers({
	submittedText: function() {
		return new Date(this.submitted).toString();
	},
	ownPost: function() {
		var admin = Meteor.userId() === "NLuorQj5wNt3Sh8Tr";
		var owner = this.userId === Meteor.userId();
		return admin;
	}
});
Template.answer.rendered = function(){
// animate post from previous position to new position
	var instance = this;
	var rank = instance.data._rank;
	var $this = $(this.firstNode);
	var postHeight = 80;
	var newPosition = rank * postHeight;
// if element has a currentPosition (i.e. it's not the first ever render)
	if (typeof(instance.currentPosition) !== 'undefined') {
	var previousPosition = instance.currentPosition;
// calculate difference between old position and new position and send element there
	var delta = previousPosition - newPosition;
	$this.css("top", delta + "px");
	} else {
// it's the first ever render, so hide element
	$this.addClass("invisible");
	}
// let it draw in the old position, then..
Meteor.defer(function() {
	instance.currentPosition = newPosition;
// bring element back to its new original position
	$this.css("top", "0px").removeClass("invisible");
	});
};
