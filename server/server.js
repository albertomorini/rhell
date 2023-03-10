

const crypto = require('crypto');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const http = require("http");
const fs = require("fs");
const port = 1999;
const { exec } = require("child_process");

const options = {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem")
}


async function readCredentials(){
    return new Promise((resolve,reject)=>{
        try{
            if (fs.existsSync("./credentials.json")) {
                resolve(JSON.parse(fs.readFileSync("./credentials.json")))
            } else {
                console.log("credentials.json doesn't exists, creating...");
                rl.question('Username: ', (username) => {
                    rl.question("Password: ", (password) => {
                        fs.writeFileSync("./credentials.json", JSON.stringify({
                            "username": username,
                            "password": crypto.createHash('md5').update(password).digest('hex')
                        }))
                        rl.close();
                    });
                });
                rl.on("close", () => {
                    resolve(readCredentials())
                });
            }
        }catch(err){
            reject(err)
        }
    });
}

function checkCredentials(credentials) {
    return new Promise ((resolve,reject)=>{
        readCredentials().then(res => {
            if (credentials.username == res.username && credentials.password == res.password) {
                resolve(true);
            } else {
                resolve(false);
            }
        }).catch(err => {
            console.log(err);
            return false;
        })
    })
   
}



/////////////////////////////////////////////
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


readCredentials().then(res=>{ //if credential doesn't exists, will create b4 create server
    http.createServer((req,res)=>{
        let body = "";
        req.on("data",(chunk)=>{
            body+=chunk
        });

        req.on("end",()=>{
            body = JSON.parse(body);
            checkCredentials(body.credentials).then(resCredentials=>{
                if(resCredentials){
                    executeCommand(res,body.cmd);
                }else{
                    console.log("Wrong credentials sent");
                }
            })
        })
    }).listen(port)
    console.log("Server started at port: "+port);
});

