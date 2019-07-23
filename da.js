const connection = require('./config');

class da {
  static savePost = (res) =>{

    let { postId, name, email, body } = res;
    return  new Promise( (resolve, reject)=> {
      connection.query(`INSERT INTO posts.comments (postId, name,email,body) VALUES ('${postId}','${name}','${email}','${body}');`,
         (err, rows) =>{
          if (rows === undefined) {
            console.log(err.message);
            reject(err);
          } else {
            resolve(rows);
          }
        })
    });

  }

  static DeletePost =  (res) => {
    let { postId } = res;
    return new Promise( (resolve, reject)=> {

      connection.query(`DELETE FROM comments WHERE postId='${postId}';`,
         (err, rows) =>{
          if (err) 
            reject(err);
          else
          resolve(rows);
        })
    });

  }

  static getSinglePost =   (res) => {

    return new Promise( (resolve, reject) =>{

      // let query = `SELECT *
      // FROM comments
      // INNER JOIN uploads
      // ON comments.postId = uploads.postId WHERE comments.postId='${res}'`;
      // //connection.query(`SELECT * FROM comments WHERE postId='${res}';`,

        connection.query(`SELECT * FROM comments WHERE postId='${res}'`,
         (err, rows)=> {
            connection.query(`SELECT * FROM uploads WHERE postId='${res}'`,
                 (err, rows1)=> {
                  if (err) {
                    console.log(err.message);
                    reject(err);
                  } else {
                    rows[0].file_url = rows1;
                    console.log(JSON.stringify(rows));
                    resolve(rows);
                  }
                });
           
          
        });

    });
  }

  static getAllPost =   () => {

    return new Promise( (resolve, reject)=> {

      connection.query(`SELECT * FROM comments`,
         (err, rows) =>{
          if (err) {
            console.log(err.message);
            reject(err);
          } else {
            resolve(rows);
          }
        });

    });
  }

  static updatePost =   (res) => {
    let { postId, id, name, email, body } = res;
    return new Promise( (resolve, reject)=> {

      connection.query(`Update comments set postId='${postId}',name='${name}',email='${email}',body='${body}' where id='${id}'`,
         (err, rows)=> {
          if (err) {
            console.log(err.message);
            reject(err);
          } else {
            resolve(rows);
          }
        });

    });

  }
  static uploadFile =   (res) => {
    let {id,filepath} = res;
    return new Promise( (resolve, reject)=> {

      connection.query(`INSERT INTO uploads (postId, file_url) VALUES ('${id}','${filepath}');`,
         (err, rows) => {
          if (err) {
            console.log(err.message);
            reject(err);
          } else {
            resolve(rows);
          }
        });

    });

  }
  static getUploadFiles =   () => {
    return new Promise( (resolve, reject) =>{

      connection.query(`select * from uploads`,
         (err, rows) => {
          if (err) {
            console.log(err.message);
            reject(err);
          } else {
            resolve(rows);
          }
        });

    });

  }
}

module.exports = da;