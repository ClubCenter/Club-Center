Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe('posts'), Meteor.subscribe('notifications'), Meteor.subscribe('questions'), Meteor.subscribe('forums'), Meteor.subscribe('accountsData'), Meteor.subscribe('products'), Meteor.subscribe('payments'), Meteor.subscribe('invoices')]
  }
});

Router.map(function() {
  this.route('postsList', {
    path: '/',
    waitOn: function(){
      Session.set('currentPost', null);
      Session.set('currentCommentId', null)
    }

  });
  this.route('questionsList', {
    path: '/questions',
    waitOn: function(){
      Session.set('currentQuestion', null);
      Session.set('currentAnswerId', null)
    }

  });
  this.route('DashboardRoot',{
    path: '/dashboard/'
  });

  this.route('DashboardPaymentPaypalExecute',{

    path: '/dashboard/payment/paypal/execute/'

  });
  this.route('postPage', {
    path: '/posts/:_id',
    waitOn: function() {
      Session.set('currentPost', this.params._id);
      Meteor.reconnect();
      return Meteor.subscribe('comments', this.params._id);
    },
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('questionPage', {
    path: '/questions/:_id',
    waitOn: function() {
      Session.set('currentQuestion', this.params._id);
      Meteor.reconnect();
      return Meteor.subscribe('answers', this.params._id);
    },
    data: function() { return Questions.findOne(this.params._id); }
  });
  this.route('forumBoard', {
    path: '/forumBoard/:_id',
    waitOn: function()
    {
      Session.set('currentForum', this.params._id);
      Meteor.reconnect();
      return Meteor.subscribe('messages', this.params._id);
    },
    data: function(){return Forums.findOne(this.params._id);}
  });

  this.route('forumAdd',{
    path:'/forumAdd'

  });

  this.route('postEdit', {
    path: '/posts/:_id/edit',
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('productEdit', {
    path: '/products/:_id/edit',
    data: function() { return Products.findOne(this.params._id); }
  });

  this.route('questionEdit', {
    path: '/questions/:_id/edit',
    data: function() { return Questions.findOne(this.params._id); }
  }); 

  this.route('commentEdit',{
    path: '/comments/:_id/edit',
    
    data: function() {
      Session.set('currentCommentId', this.params._id);
      Session.set('currentPost', Comments.findOne(this.params._id).postId);
     return Comments.findOne(this.params._id);}
  });
  
  this.route('answerEdit',{
    path: '/answers/:_id/edit',
    
    data: function() {
      Session.set('currentAnswerId', this.params._id);
      Session.set('currentQuestion', Answers.findOne(this.params._id).questionId);
     return Answers.findOne(this.params._id);}
  });
  this.route('invoiceSheet',{
    path: '/invoiceSheet'
  });

  this.route('postSubmit', {
    path: '/submit'
  });

  this.route('productAdd',{
    path: '/addProduct'
  });

  this.route('questionSubmit', {
    path: '/question/submitter'
  });

  this.route('paymentOptions',{
    path: '/payment'
  });
  this.route('collTest',{
    path: '/fileCenter',
    waitOn: function() {
      Meteor.reconnect();
    }
  });

  this.route('myFiles',{
    path: '/myFiles',
    waitOn: function() {
      Meteor.reconnect();
    }
  });

  this.route('aboutUs',{
    path: '/AboutCongregation'
  });
});


var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    
    pause();
  }
}

Router.onBeforeAction('loading');
//Router.onBeforeAction(requireLogin, {only: 'questionSubmit'});
Router.onBeforeAction(requireLogin, {only: ['postSubmit', 'postEdit','questionSubmit', 'questionEdit', 'forumAdd', 'commentEdit', 'answerEdit', 'DashboardRoot']});

Router.onBeforeAction(function() { clearErrors() });