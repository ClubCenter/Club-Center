Polls = new Meteor.Collection('polls');

Meteor.methods({
	makePoll: function(pollAttributes){
		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error(401, "You need to login to make a poll");

		if(!pollAttributes.title)
			throw new Meteor.Error(422, 'Please add title');

		
		var v = new Array(pollAttributes.choices.length);
		for	(index = 0; index < v.length; index++) 
		{
    		v[index] = 0;
		}
		var poll = _.extend(_.pick(pollAttributes, 'title', 'showLive', 'choices', 'closeDate'),{
			votes: v,
			submitted: new Date().getTime(),
			
		});
		var pollId = Polls.insert(poll);

		return pollId;
	}	
});