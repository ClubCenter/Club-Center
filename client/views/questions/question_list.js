Template.questionsList.helpers({
  questionList: function() 
  	{
  		 //Meteor.subscribe('questions', Session.get('questionsLimit'));
  		return Questions.find({}, {sort: {latestUpdate: -1}});
  	},
  moreResults: function()
  {
  		console.log("question count: "+ Questions.find().count());
  		console.log("QuestionLimit: " + Session.get('questionsLimit'));
    	return Questions.find().count() === Session.get('questionsLimit')
  }
});

Template.questionsList.rendered= function()
{
	Meteor.disconnect();
};

Template.questionsList.destroyed=function()
{
	Session.set('questionsLimit', ITEMS_INCREMENT);
	Meteor.reconnect();
};

/*if (Meteor.isServer) {
 
  Meteor.publish('questions', function(limit) {
    return Questions.find({}, { limit: limit , sort: {latestUpdate: -1} });
  });   
 
} else*/ if (Meteor.isClient) {
 
  var ITEMS_INCREMENT = 10;
  Session.setDefault('questionsLimit', ITEMS_INCREMENT);
  Deps.autorun(function() {
    Meteor.subscribe('questions', Session.get('questionsLimit'));
  });
 }

function showMoreVisibleQuestions() {
	if(window.location.href === "http://congregation.meteor.com/questions")
	{
    var threshold, target = $('#showMoreResults');
    if (!target.length) return;
 
    threshold = $(window).scrollTop() + $(window).height() - target.height();
 
    if (target.offset().top < threshold) {
        if (!target.data('visible')) {
        	Meteor.reconnect();
            // console.log('target became visible (inside viewable area)');
            target.data('visible', true);
            Session.set('questionsLimit',
                Session.get('questionsLimit') + ITEMS_INCREMENT);
        }
    } else {
        if (target.data('visible')) {
            // console.log('target became invisible (below viewable arae)');
            Meteor.disconnect();
            target.data('visible', false);
        }
    } 
    }       
};
// run the above func every time the user scrolls
$(window).scroll(showMoreVisibleQuestions);