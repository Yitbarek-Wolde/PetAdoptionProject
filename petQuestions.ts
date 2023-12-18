import prompts from "prompts";
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

getPets();
