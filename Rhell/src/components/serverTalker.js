import { Storage } from '@ionic/storage';
const store = new Storage();
store.create();

function getSocket(){
    return new Promise((resolve,reject)=>{
        store.get("IPServer").then(res=>{
            resolve("https://" + res + ":1999");
        });
    })
}
async function getCredentials(){
    return new Promise((resolve,reject)=>{
        store.get("Username").then(username=>{
            store.get("Password").then(password=>{
                resolve([username,password]);
            })
        })
    })
}



export const executeCommand = async (cmd) =>{
    return new Promise((resolve,reject)=>{
        getCredentials().then(cred=>{
            getSocket().then(socket=>{
               
                fetch(socket, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify({
                        "credentials": {
                            "username": cred[0],
                            "password": cred[1]
                        },
                        "cmd": cmd
                    })
                }).then(res => resolve(res)).catch(err => reject(err));
            })
        }).catch(err=>{
            reject(err)
        })
    });
}