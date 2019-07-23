
class Display{

        static display = (results,response) => {
       
            let resp = {};
            resp.status = 200;
            resp.message = "Success";
            resp.payload = results;
            response.send(resp);
        
        
}
}

module.exports = Display;