Template.postsList.helpers({
  posts: function() {
    return Posts.find({}, {sort: {pinned: -1,submitted: -1}});
  }
});