
function getSocket(){
    
}



export const executeCommand = () =>{
    return new Promise((resolve,reject)=>{
        fetch(getSocket(),{
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                "credentials": "TODO" //TODO:
            })
        }).then(res=>resolve(res)).catch(err=>reject(err));
    });
}