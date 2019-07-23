let csv = require('csv'); 
const connection = require('./config');
let obj = csv(); 
let express = require("express");
let bodyParser = require('body-parser')
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function Mydata(postid, name,email,body) {
    
    this.postid = postid;
    this.name = name;
    this.email = email;
    this.body = body;
}; 

let MyData = []; 

obj.from.path('dump.csv').to.array(function (data) {
    for (let index = 0; index < data.length; index++) {
        MyData.push(new Mydata(data[index][1], data[index][2], data[index][3], data[index][4]));
    }
    
});

let uploadData =   (MyData) => {
    Mydata = JSON.stringify(MyData);
    let data = MyData.map(value =>{
            return Object.values(value);
          
    });
    
    console.log(data);
    return new Promise(function (resolve, reject) {

      connection.query(`INSERT INTO comments (postId, name,email,body) VALUES ?`,[data] ,
        function (err, rows) {
          if (err) {
            console.log(err.message);
            reject(err);
          } else {
            resolve(rows);
          }
        });

    });

  }

  app.post("/up", async (request, response) => {
    try{
    let uploadData_ = await uploadData(MyData);
    console.log(uploadData_);
    }catch(err){

    }
});
app.listen(8080);


