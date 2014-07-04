Template.myFiles.events({
  'click .del-file': function(e, t) {
    console.log(Meteor.users.findOne( Meteor.userId()));
    if(confirm("Delete this File?") )
    {
    return Files.remove({
      _id: this._id
    });
  }
  },
  'click .make-private': function(e, t){
    if(confirm("Make this file private?"))
    {
      Meteor.call('makePrivate',this._id, function(error, id){});
    }
  },
  'click .make-public': function(e, t){
    if(confirm("Make this file public?"))
    {
      Meteor.call('makePublic',this._id, function(error, id){});
    }
  },
});
Template.myFiles.helpers({
  dataEntries: function(){
    Session.get('files');
    var a = Meteor.userId();
    console.log(a);

        return Files.find({'aliases': a},{sort: {uploadDate: -1}});

      //return Files.find({'metadata.owner': a});    
  },

  time: function(){
    //window.location.reload();
    console.log(Files.findOne(this._id));
    if(!Files.findOne(this._id))
    {
      window.location.reload();
    }
    var p = "" + Files.findOne(this._id).contentType + Files.findOne(this._id).aliases[0];
    console.log(p);
    var a = ""+Files.findOne(this._id).uploadDate
    var t = new Date(a);
    var hours = t.getHours();
    var s = t.toString().substring(4, 15);
    if(hours > 12)
    {
      return s + " " + (hours-12).toString() + t.toString().substring(18,24) + " PM" + p
    }else if(hours === 0)
    {
      return s+ " "+ (hours +12).toString() + t.toString().substring(18,24) + " AM" + p
    }else
    {
      return t.toString().substring(4,24) +" AM" + p;
    }
  },
  owner: function() {
    return Meteor.users.findOne(this.metadata.owner).username;
  },
  id: function(){
    return "" + this._id;
  },
  link: function(){
    return Files.baseURL + "/" + this.md5;
  },
  uploadStatus: function(){
    var percent;
  percent = Session.get("" + this._id);
  if (percent === null) {
    return "Processing...";
  } else {
    return "Uploading...";
  }
},
uploadProgress: function(){
  var percent;
  console.log(Session.get(""+ this._id));
  percent = Session.get("" + this._id);
  return percent;
},
isImage: function(){
  var types;
  types = {
    'image/jpeg': true,
    'image/png': true,
    'image/gif': true,
    'image/tiff': true
  };
  return types[this.contentType] !== null;
},  
fixlength: function(){
    var a = this.length;
    var count = 0;
    while(a > 1024)
    {
      a= a/1024
      count = count+1;
    }
    if(count === 0)
    {
      return a +" bytes"
    }else if(count === 1)
    {
      return a.toFixed(2) + " KB"
    }else if(count === 2)
    {
      return a.toFixed(2) + " MB"
    }else if(count === 3)
    {
      return a.toFixed(2) + " GB"
    }
    else
      return a;

  },
userId: function(){
  return Meteor.userId();
},
isPublic: function(){
  return Files.findOne(this._id).contentType === "true";
}
});

Template.myFiles.rendered = function(){
    Files.resumable.assignDrop($(".fileDrop"));

    // This assigns a browse action to a DOM node
    Files.resumable.assignBrowse($(".fileBrowse"));

  
      
    
};
