
/*
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function executeCommand(res,strCommand){
    exec("cd ~;"+strCommand, (error, stdout, stderr) => {
        if (error) {
            res.writeHead({"Content-type":"application/json","Access-Control-Allow-Origin":"*"})
            res.write(error)
            res.end()
            return;
        }
        if (stderr) {
            res.writeHead({"Content-type":"application/json","Access-Control-Allow-Origin":"*"})
            res.write(stderr)
            res.end()
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.writeHead(200,{"Content-type":"application/json","Access-Control-Allow-Origin":"*"})
        res.write(JSON.stringify({
            "res":stdout
        }));
        res.end();
        
    });

}

*/

const PORT= 4321;
const https = require('https');
const fs = require("fs")
const mongoExecutor = require("./mongoExecutor.js")
var exec = require('child_process').exec;

const options = {
    key: fs.readFileSync("./sslcert/key.pem"),
    cert: fs.readFileSync("./sslcert/cert.pem")
}
////////////////////////////////////

function sendResponse(res, status, body, contentType ="Application/JSON"){
    res.writeHead(status, { "Content-type": contentType, "Access-Control-Allow-Origin": "*" })
    res.write(JSON.stringify(body))
    res.end()
}


function execShell(command, callback) {
    exec("cd ~;"+command, (error, stdout, stderr) =>{ 
        callback(stdout); 
    });
};

async function isAuthenticated(username,password){
    return mongoExecutor.authenticate(username,password).then(resQuery=>{
        if(resQuery==null){
            return false;
        }else{
            return true;
        }
    })
}

https.createServer(options, (req,res)=>{
    let body="";
    req.on("data",(chunk)=>{
        body+=chunk
    });

    req.on("end", async ()=>{
        try{
            body = JSON.parse(body)
        }catch(ex){
            //Not json or bodyless
        }

        if (await isAuthenticated(body.username, body.password)){
            if (req.url =="/authenticate"){
                sendResponse(res,200,{"data":{
                    "Username":body.username,
                    "Password":body.password
                }})
            }
            ////////////////////////////////////
            if(req.url=="/mngWidget"){
                mongoExecutor.mngWidget(body.action, body.username, body?.title, body?.command, body?.type, body?.WidgetID).then(resQuery=>{
                    sendResponse(res,200,{"data":resQuery})
                })
            }
            ////////////////////////////////////
            if(req.url=="/execShell"){
                execShell(body.command,(output)=>{
                    sendResponse(res,200,{"data":output})
                });
            }
        }else{
            sendResponse(res,403,{"data":"Wrong user or password"});
        }
    });
}).listen(PORT);

// mongoExecutor.insertUser("alby","alby")
// mongoExecutor.authenticate("alby","alby").then(resquery=>{
//     console.log(resquery)
// })
// mongoExecutor.deleteUsers()