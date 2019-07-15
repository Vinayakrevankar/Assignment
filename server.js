var express = require("express");
var db = require('./db');
var bodyParser = require('body-parser')
var validate = require('./validate.js');
var app = express();
let resp = {};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/post",  function(request, response) {
  
 
  let verify = validate(request.body);
if(verify.error === null){ // return true | error
  let saved = db.savePost(request.body);
        saved.then(function(results){
          response.send(results)
        }).catch(function(err){
                                  console.log("1 Promise rejection error: "+err);
      
                                });
    }else{
      resp.status = 200;
      resp.message = verify.error.details[0].message;
      resp.payload = [];
      response.send(resp);
    }     
 });

 app.delete("/post/delete", function(request, response) {
     
  let deleteComment = db.DeletePost(request.body);
  
  deleteComment.then(function(results){
    response.send("Deleted Successfully")
    console.log('2 '+results)}).catch(function(err){
                            console.log("Promise rejection error: "+err);

                          });     
});

app.get("/post/singlePost", function(request, response) {
     
  let singlePost =  db.getSinglePost(request.body);
 
  singlePost.then(function(results){
    resp.status = 200;
    resp.message = "Success";
    resp.payload = results;
    response.send(resp);
   
    console.log('3 '+results)}).catch(function(err){
                            console.log("Promise rejection error: "+err);

                          });     
});
app.get("/post/allPosts", function(request, response) {
     
  let AllPost = db.getAllPost();
 
  AllPost.then(function(results){
    resp.status = 200;
    resp.message = "Success";
    resp.payload = results;
    response.send(resp);
    console.log('4 '+results)}).catch(function(err){
                            console.log("Promise rejection error: "+err);

                          });     
});

app.put("/post/updatePost", function(request, response) {
     
  let updatePost =  db.UpdatePost(request.body);
 
  updatePost.then(function(results){
    response.send("Update Successfully");
    console.log('5 '+results)}).catch(function(err){
                            console.log("Promise rejection error: "+err);

                          });     
});
app.use(function(req, res, next){
  res.status(404);
  res.send("Page Not Found");
});
  app.listen(8080, () => console.log(`Example app listening on port!`))