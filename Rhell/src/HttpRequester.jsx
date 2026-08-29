

const defaultMimeReq="Application/JSON"
var serverName = "";
import { Storage } from '@ionic/storage';
const store = new Storage()
const port=4321
const schema="https://"

export function loadConfig(){
     store.create();
     return store.get("serverName").then(res=>{
          if(res=="" || res==undefined){
               return false;
          }else{
               serverName=res;
               return true;
          }
     })
}
export function showServerConfig(){
     console.log(serverName)
}

export const doRequest = (api, bodyP, contentType = defaultMimeReq,methodP="POST")=>{
     return fetch(schema+serverName+":"+port+"/"+api,{
          method : methodP,
          mode: "cors",
          body:(contentType==defaultMimeReq)? JSON.stringify(bodyP):body
     });
}