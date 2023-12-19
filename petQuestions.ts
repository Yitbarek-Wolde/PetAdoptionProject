import prompts from "prompts";
import { jwtDecode } from "jwt-decode";
import { sendReq, AccessToken, APIToken } from "./APIconnect";
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
return "?"+quaryParameter[0][0] + "="+ quaryParameter[0][1]+
"&"+quaryParameter[1][0]+"="+quaryParameter[1][1]+"&"+quaryParameter[2][0]+"="+quaryParameter[2][1]

}

let grant = localStorage.getItem('access')
let grantkey = localStorage.getItem('key')
let grantaccess = `{ 'Authorization': 'Bearer ${grant}' }`

fetch(`https://api.petfinder.com/v2/animals${getPets()}`, {method: 'GET'})
