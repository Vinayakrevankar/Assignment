
var express =
    require("express");
var app =
    express();

const mysql = require('mysql');
var con =
    mysql.createConnection({

        host: "localhost",

        user: "root",

        password: "password",

        database: "posts"

    });

con.connect(function (err) {

    if (err)
        throw err;

    console.log("Connected!");

});


app.post("/post",
    function (request,
        response) {


        let saved =
            savePost(request.body);

        saved.then(function (results) {

            response.send(request.body)

            console.log(results)
        }).catch(function (err) {

            console.log("Promise rejection error: " + err);


        });

    });



app.delete("/post/delete",
    function (request,
        response) {


        let deleteComment =
            DeletePost(request.body);

        console.log(request.body);

        deleteComment.then(function (results) {

            response.send("Deleted Successfully")

            console.log(results)
        }).catch(function (err) {

            console.log("Promise rejection error: " + err);



        });

    });



app.get("/post/singlePost",
    function (request,
        response) {


        let singlePost =
            getSinglePost(request.body);


        singlePost.then(function (results) {

            response.send(results)

            console.log(results)
        }).catch(function (err) {

            console.log("Promise rejection error: " + err);



        });

    });

app.get("/post/allPosts",function (request,response) {


        let AllPost = getAllPost();


        AllPost.then(function (results) {

            response.send(results)

            console.log(results)
        }).catch(function (err) {

            console.log("Promise rejection error: " + err);



        });

    });

app.put("/post/updatePost",function (request,response) {


        let updatePost =
            UpdatePost(request.body);


        updatePost.then(function (results) {

            response.send("Update Successfully");

            console.log(results)
        }).catch(function (err) {

            console.log("Promise rejection error: " + err);



        });

    });

let savePost = (res)=> {

    let { postId, id, name, email, body } =
        res;

    return new
        Promise(function (resolve,
            reject) {

            con.query(`INSERT INTO posts.comments (postId, name,email,body,id) VALUES ('${postId}','${name}','${email}','${body}','${id}');`,

                function (err,
                    rows) {

                    if (rows ===
                        undefined) {

                        console.log(err.message);

                        reject(err);

                    } else {

                        resolve(rows);

                    }

                })

        });



}



let DeletePost = (res)=> {

    let { id } =res;

    return new
        Promise(function (resolve,
            reject) {


            con.query(`DELETE FROM posts.comments WHERE id='${id}';`,

                function (err,
                    rows) {

                    if (err)
                        throw err;

                    console.log("Number of records deleted: " +
                        result.affectedRows);

                })

        });



}



let getSinglePost = (res)=> {

    let { id } =res;

    return new
        Promise(function (resolve,
            reject) {


            con.query(`SELECT * FROM comments WHERE id='${id}';`,

                function (err,
                    rows) {

                    if (err) {

                        console.log(err.message);

                        reject(err);

                    } else {

                        resolve(rows);

                    }

                });



        });

}



let getAllPost = ()=> {


    return new
        Promise(function (resolve,
            reject) {


            con.query(`SELECT * FROM comments`,

                function (err,
                    rows) {

                    if (err) {

                        console.log(err.message);

                        reject(err);

                    } else {

                        resolve(rows);

                    }

                });



        });

}



let UpdatePost = (res)=> {

    let { postId, id, name, email, body } =
        res;

    return new
        Promise(function (resolve,
            reject) {


            con.query(`Update comments set postId='${postId}',name='${name}',email='${email}',body='${body}'
 where id='${id}'`,

                function (err,
                    rows) {

                    if (err) {

                        console.log(err.message);

                        reject(err);

                    } else {

                        resolve(rows);

                    }

                });



        });

}


app.listen(8080, () => console.log(`Example app listening on port!`))


