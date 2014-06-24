Template.questionsList.helpers({
  questions: function() {
  	{
  		return Questions.find({}, {sort: {latestUpdate: -1}});
  	};
    
  }
});

Template.questionsList.rendered= function()
{
	Meteor.disconnect();
};

Template.questionsList.destroyed=function()
{
	Meteor.reconnect();
}

