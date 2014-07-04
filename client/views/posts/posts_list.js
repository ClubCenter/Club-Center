Template.postsList.helpers({
  posts: function() {
    return Posts.find({}, {sort: {pinned: -1,submitted: -1}});
  },
  moreResults: function()
  {
  		console.log("post count: "+ Posts.find().count());
  		console.log("PostLimit: " + Session.get('postsLimit'));
    	return Posts.find().count() === Session.get('postsLimit')
  }
});

if (Meteor.isClient) {
 
  var ITEMS_INCREMENT = 10;
  Session.setDefault('postsLimit', ITEMS_INCREMENT);
  Deps.autorun(function() {
    Meteor.subscribe('posts', Session.get('postsLimit'));
  });
 }
Template.postsList.destroyed=function()
{
	Session.set('postsLimit', ITEMS_INCREMENT);
	//Meteor.reconnect();
};
function showMoreVisiblePosts() {
	if(window.location.href === "http://congregation.meteor.com/")
	{
    var threshold, target = $('#showMoreResults');
    if (!target.length) return;
 
    threshold = $(window).scrollTop() + $(window).height() - target.height();
 
    if (target.offset().top < threshold) {
        if (!target.data('visible')) {
        	//Meteor.reconnect();
            // console.log('target became visible (inside viewable area)');
            target.data('visible', true);
            Session.set('postsLimit',
                Session.get('postsLimit') + ITEMS_INCREMENT);
        }
    } else {
        if (target.data('visible')) {
            // console.log('target became invisible (below viewable arae)');
           // Meteor.disconnect();
            target.data('visible', false);
        }
    } 
    }       
};
// run the above func every time the user scrolls
$(window).scroll(showMoreVisiblePosts);