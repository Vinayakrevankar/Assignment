var express = require("express");
var da = require('./da');
var bodyParser = require('body-parser')
var validate = require('./validate.js');
var Display = require('./handlepromise');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/post", async (request, response) => {

  try{
  let verify = validate(request.body);
  if (verify.error === null) { // return true | error
    let saved = await da.savePost(request.body);
    console.log("Message");
    Display.display(saved, response);
  } else {
   // HandlePromiseAndDisplay.displayresponse(200, verify.error.details[0].message, [], response)
  }
}catch(err){
  console.log(err.message);
}
});


app.delete("/post/delete",async (request, response) => {

  console.log(request.body);
  let deleteComment = await da.DeletePost(request.body);

  Display.display(deleteComment, response);

});

app.get("/post/singlePost",async (request, response) => {

  let singlePost = await da.getSinglePost(request.body);
  Display.display(singlePost, response);
});

app.get("/post/allPosts",async (request, response) => {

  let allPost = await da.getAllPost();
  Display.display(allPost, response);
});

app.put("/post/updatePost",async (request, response) => {

  let updatePost = await da.UpdatePost(request.body);
  Display.display(updatePost, response);
});

app.use((req, res, next) => {
  res.status(404);
  res.send("Page Not Found");
});


app.listen(8080, () => console.log(`Example app listening on port!`))
