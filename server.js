let express = require("express");
let da = require('./da');

let bodyParser = require('body-parser')
let validate = require('./validate.js');
let Display = require('./display');
const fileUpload = require('express-fileupload');
let app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let options = {
   host : "localhost",
   port : "8080"
}


app.post("/post", async (request, response) => {

  try{
  let verify = validate(request.body);
  if (verify.error === null) { // return true | error
    let saved = await da.savePost(request.body);
    console.log(saved);
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

app.get("/post/singlePost/:id",async (request, response) => {

 console.log(request.params.id);
  let singlePost = await da.getSinglePost(request.params.id);
  Display.display(singlePost, response);
});

app.get("/post/allPosts",async (request, response) => {

  let allPost = await da.getAllPost();
  Display.display(allPost, response);
});

app.put("/post/updatePost",async (request, response) => {

  let updatePost = await da.updatePost(request.body);
  Display.display(updatePost, response);
});

app.post('/upload',(req, res)=> {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let file = req.files.File;
  let path = `./files/${file.name}`;
  file.filepath= `/files/${file.name}`;
  file.id=  req.body.id;
  console.log(file);
 
  file.mv(path, async (err) => {
    if (err)
      return res.status(500).send(err);
      let uploadFile = await da.uploadFile(file);
      Display.display(uploadFile, res);
  });
});


app.get('/getupload', async(req, res) => {
 
      let getUploadFiles = await da.getUploadFiles();
      Display.display(getUploadFiles, res);
});

// app.get('*', function(req, res){
//   res.send('Sorry, this is an invalid URL.');
// });

app.listen(options.port, () => console.log(`Example app listening on port!`))
