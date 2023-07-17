const readline = require("readline");
const crypto = require('crypto'); //for MD5 function
const PORT= 4321;
const https = require('https');
const fs = require("fs")
const mongoExecutor = require("./mongoExecutor.js")
var exec = require('child_process').exec;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const options = {
    key: fs.readFileSync("./sslcert/key.pem"),
    cert: fs.readFileSync("./sslcert/cert.pem")
}
////////////////////////////////////

//send an https response
function sendResponse(res, status, body, contentType ="Application/JSON"){
    res.writeHead(status, { "Content-type": contentType, "Access-Control-Allow-Origin": "*" })
    res.write(JSON.stringify(body))
    res.end()
}

//Execute shell command to homedirectory
function execShell(command, callback) {
    exec("cd ~;"+command, (error, stdout, stderr) =>{ 
        callback(stdout); 
    });
};

// return true if the packet is authenticated
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

//Create/delete user
function menu(){

    rl.question(
        "Press 1 to create a new user \nPress 2 to delete an existing user\n>"
        , (choiche)=> {
            try{
                if(parseInt(choiche)==1){ //CREATE USER

                    rl.question("Insert the username: \t", function (username) {
                        rl.question("Insert the password (I'll hash it):\t",(psw)=>{
                            
                            let hash = crypto.createHash('md5').update(psw).digest('hex');
                            console.log(hash);
                            mongoExecutor.insertUser(username, hash).then(resCreation=>{
                                console.log("\n"+resCreation+"\n");
                                //menu()
                            })
                        })
                    });
                }else if(parseInt(choiche)==2){ //DELETE USER
                    rl.question("Insert the username:\t", function (username) {
                        mongoExecutor.deleteUser(username).then(resDelete=>{
                            console.log("\n"+resDelete+"\n");
                            //menu()
                        });
                    })
                }
            }catch(err){
                console.log("HEY! Insert an integer pls");
            }
    });
}

menu();

// mongoExecutor.getUsers().then(res=>{
//     console.log(res)
// })