
function getSocket(ipserver){
    return "https://"+ipserver+":1999";
}



export const executeCommand = (username,password,cmd) =>{
    return new Promise((resolve,reject)=>{
        fetch(getSocket(),{
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                "credentials": {
                    "username": username,
                    "password": password
                },
                "cmd": cmd
            })
        }).then(res=>resolve(res)).catch(err=>reject(err));
    });
}