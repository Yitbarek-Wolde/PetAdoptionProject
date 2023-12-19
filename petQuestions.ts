import prompts from "prompts";
import { jwtDecode } from "jwt-decode";
import { sendReq, AccessToken, APIToken } from "./APIconnect";
import { LocalStorage } from "node-localstorage";
import { send } from "process";

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
return "?"+quaryParameter[0][0] + "="+ quaryParameter[0][1]+
"&"+quaryParameter[1][0]+"="+quaryParameter[1][1]+"&"+quaryParameter[2][0]+"="+quaryParameter[2][1]

}


let localStorage = new LocalStorage("./scratch");

let grant = localStorage.getItem('fullToken')

let a = `https://api.petfinder.com/v2/animals?type=Dog&gender=Male`

const head = {
    Authorization:`Bearer ${grant}`
  };
  
fetch(a, {method: 'GET',headers: head})
  .then(a => a.json())
  .then(c => console.log(c))

