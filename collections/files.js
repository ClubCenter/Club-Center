Files = new FileCollection('files',
{ resumable: true,   // Enable built-in resumable.js upload support
    http: [
      { method: 'get',
        path: '/:md5',  // this will be at route "/gridfs/myFiles/:md5"
        lookup: function (params, query) {  // uses express style url params
          return { md5: params.md5 };       // a mongo query mapping url to myFiles
        }
      }
    ]
  }
);

if (Meteor.isServer) {

  // Only publish files owned by this userId, and ignore
  // file chunks being used by Resumable.js for current uploads
  Meteor.publish('files', function(){
	return Files.find({ 'metadata._Resumable': { $exists: false }});
  //return Files.find();
});
  
  // Allow rules for security. Should look familiar!
  // Without these, no file writes would be allowed
  Files.allow({
    remove: function (userId, file) {
      // Only owners can delete
      if (userId !== file.metadata.owner) {
        return false;
      } else {
        return true;
      }
    },
    // Client file document updates are all denied, implement Methods for that
    // This rule secures the HTTP REST interfaces' PUT/POST
    update: function (userId, file, fields) {
      // Only owners can upload file data
      if (userId !== file.metadata.owner) {
        return false;
      } else {
        return true;
      }
    },
    insert: function (userId, file) {
      // Assign the proper owner when a file is created
      file.metadata = file.metadata || {};
      file.metadata.owner = userId;
      if(userId !== null)
      	return true;
      else
      	return false;
    }
  });
}

if (Meteor.isClient) {

  Meteor.subscribe('files');

  Meteor.startup(function() {
    // This assigns a file upload drop zone to some DOM node
    Files.resumable.assignDrop($(".fileDrop"));

    // This assigns a browse action to a DOM node
    Files.resumable.assignBrowse($(".fileBrowse"));

    // When a file is added via drag and drop
    Files.resumable.on('fileAdded', function (file) {
      console.log(document.URL);
      var a = document.URL === "http://congregation.meteor.com/fileCenter"
      console.log("" + a);
      a = "" + a;
    	var b = "" + Meteor.userId();
      console.log(b);
     //var a = "true";
      // Create a new file in the file collection to upload
      Files.insert({
        time: Date.now(),
        _id: file.uniqueIdentifier,  // This is the ID resumable will use
        filename: file.fileName,
        contentType: a,
        aliases: [ b ]
       

        },
        function (err, _id) {  // Callback to .insert
          if (err) { return console.error("File creation failed!", err); }
          // Once the file exists on the server, start uploading
          console.log("Uploading file");
          Session.set('files', Files.find().count())
          Files.resumable.upload();
          console.log("Uploaded?");
          //window.location.reload();
        }
      );
      
    });
  });

}

Meteor.methods({
  makePrivate: function(fileId){
    Files.update(
      {_id: fileId},
      {
        $set: {'contentType': "false"}
      }

      );
  },
  makePublic: function(fileId){
    Files.update(
      {_id: fileId},
      {
        $set: {'contentType': "true"}
      }

      );
  }

});

    

   
 