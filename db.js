//db page 
const connection = require('./config');

class db {
 static savePost = function(res){
       
        let {postId,name,email,body} = res;
        return new Promise(function(resolve, reject){                                                                                
                          connection.query(`INSERT INTO posts.comments (postId, name,email,body) VALUES ('${postId}','${name}','${email}','${body}');`, 
                          function(err, rows){                                                
                              if(rows === undefined){
                                  console.log(err.message);
                                  reject(err);
                              }else{
                                  resolve(rows);
                              }
                            })
                          });

  }

  static DeletePost = (res) =>{
    let {postId} = res;
    return new Promise(function(resolve, reject){     
                                                       
                      connection.query(`DELETE FROM posts.comments WHERE postId='${postId}';`, 
                      function(err, rows){                                                
                        if (err) throw err;
                        console.log("Number of records deleted: " + result.affectedRows);
                        })
                      });

}

static getSinglePost =  (res) =>{
  let {postId} = res;
  return new Promise(function(resolve, reject){     
                                                     
                    connection.query(`SELECT * FROM comments WHERE postId='${postId}';`, 
                    function(err, rows){                                                
                      if(err){
                        console.log(err.message);
                        reject(err);
                    }else{
                        resolve(rows);
                    }
                    });

});
}

static getAllPost = () =>{
 
  return new Promise(function(resolve, reject){     
                                                     
                    connection.query(`SELECT * FROM comments`, 
                    function(err, rows){                                                
                      if(err){
                        console.log(err.message);
                        reject(err);
                    }else{
                        resolve(rows);
                    }
                    });

});
}

static UpdatePost = (res) =>{
  let {postId,id,name,email,body} = res;
  return new Promise(function(resolve, reject){     
                                                     
                    connection.query(`Update comments set postId='${postId}',name='${name}',email='${email}',body='${body}' where id='${id}'`, 
                    function(err, rows){                                                
                      if(err){
                        console.log(err.message);
                        reject(err);
                    }else{
                        resolve(rows);
                    }
                    });

});

}
}

module.exports = db