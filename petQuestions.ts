import prompts from "prompts";
import { sendReq, AccessToken } from "./APIconnect";
import { LocalStorage } from "node-localstorage";

async function getPets() {
const userInput= await prompts ([
{
    type:"text",
    name: 'name',
    message: 'Enter animal name',
},
{
    type:"select",
    name:"type",
    message:"select animal type",
    choices:[
        {title:"Dog", value:"Dog"},
        {title: "cat", value:"Cat"}
    ]
},
{
    type:"select",
    name:"gender",
    message:"select animal gender",
    choices:[
        {title:"Male", value:"Male"},
        {title: "Female", value:"Female"}
    ]
}
])

const quaryParameter=  Object.entries(userInput)   

console.log("?"+quaryParameter[0][0] + "="+ quaryParameter[0][1]+
"&"+quaryParameter[1][0]+"="+quaryParameter[1][1]+"&"+quaryParameter[2][0]+"="+quaryParameter[2][1]
)
}

let localStorage = new LocalStorage("./scratch"); //scratch folder store it in that fold all files
let access: AccessToken;
let storeAccess;

async function storeToLocal(){
let c = await sendReq();
 access = c
 storeAccess = localStorage.setItem("access",JSON.stringify(access))
}
storeToLocal()