
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Customer"
  });



var http = require('http');

http.createServer((req, res)=> {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(8080);






getCustomer = () =>{
  return new Promise((resolve, reject)=>{
    con.query("SELECT * from users", 
        function(err, rows){                                                
            if(rows === undefined){
                reject(new Error("Error rows is undefined"));
            }else{
                resolve(rows);
            }
        }
    )});
}



saveCustomer = (...data)=>{
    let email = data[2].trim();
  return new Promise((resolve, reject)=>{
    con.query('SELECT Email FROM USERS WHERE Email = ?',email, 

        function(err, rows){                                           
            if(err){
              
                reject(new Error("error"));
            }else{
             
              if(rows.length == 1){
                reject(new Error("user Already Exists"));;
              }else{
                con.query(`INSERT INTO users (sno, Name, Mobile, Email, Password) VALUES (NULL,'${data[0]}', '${data[1]}','${data[2]}','${data[3]}');`, 
                (err, rows)=>{                                                
                    if(rows === undefined){
                        reject(new Error("Error rows is undefined"));
                    }else{
                        resolve(rows);
                    }
                });
              }
            
               
            }
        });
    
    
    
});
};


deleteCustomer = (sno)=>{
  return new Promise((resolve, reject)=>{
    con.query(`Delete from users where sno='${sno}'`, 
        (err, rows)=>{                                                
            if(rows === undefined){
                reject(new Error("Error rows is undefined"));
            }else{
                resolve(rows);
            }
        }
    )});
}


  

var stdin = process.openStdin();
console.log(" 1) Enter Name, Mobile,Email,Password \n 2) Display Customer \n 3) Delete Customer");
stdin.addListener("data", function(d) {
  
 let value =  d.toString().trim().split(" ");
 
        switch(parseInt(value[0])){
          case 1: saveCustomer(value[1],value[2],value[3],value[4]).then(function(results){console.log(results)}).catch(function(err){
                        console.log("Promise rejection error: "+err);
                    });
                  break;
                
          case 2: getCustomer().then(function(results)
                  {
                                console.log(results);
                  })
                    .catch(function(err){
                    console.log("Promise rejection error: "+err);
                    });
                    break;

          case 3: deleteCustomer(value[1]).then(function(results){
            console.log(results)}).catch(function(err){
            console.log("Promise rejection error: "+err);
         });
         break;
        }
  });


