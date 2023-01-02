

const crypto = require('crypto');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const https = require("https");
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
    readCredentials().then(res=>{
        if(credentials.username==res.username && credentials.password==res.password){
            return true;
        }else{
            return false;
        }
    }).catch(err=>{
        console.log(err);
        return false;
    })
}



/////////////////////////////////////////////
function executeCommand(res,strCommand){
    exec("cd ~;"+strCommand, (error, stdout, stderr) => {
        if (error) {
            res.writeHead({"Content-type":"application/json","Access-Control-Allow-Origin":"*"})
            res.write(error)
            res.end()
            console.log("ERRORE"+err);
            return;
        }
        if (stderr) {
            res.writeHead({"Content-type":"application/json","Access-Control-Allow-Origin":"*"})
            res.write(stderr)
            res.end()
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

}


readCredentials().then(res=>{ //if credential doesn't exists, will create b4 create server
    https.createServer(options,(req,res)=>{
        let body = "";
        req.on("data",(chunk)=>{
            body+=chunk
        });

        req.on("end",()=>{
            body = JSON.parse(body);
            console.log(body);
            if(checkCredentials(body.credentials)){
                executeCommand(res,body.cmd);
            }
        })
    }).listen(port)
    console.log("Server started at port: "+port);
});


