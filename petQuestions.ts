import prompts from "prompts";
import fetch, { Response } from 'cross-fetch';
import { sendReq, AccessToken, APIToken } from "./APIconnect";
import { LocalStorage } from "node-localstorage";
import { Root, Animal, pet, base, BookType, BookTypeObject } from "./types";

type st ={
    typed: string | undefined
    named: string
   breed: string
    size:  string
    age: string
    color : string | undefined
    Status: string

}

let localStorage = new LocalStorage("./scratch");
async function getPets() {
    const userInput = await prompts([
        {
            type: "text",
            name: "name",
            message: "Enter animal name"
        },
        {
            type: "select",
            name: "type",
            message: "select animal type",
            choices: [
                { title: "Dog", value: "Dog" },
                { title: "cat", value: "Cat" }
            ]
        },
        {
            type: "select",
            name: "gender",
            message: "select animal gender",
            choices: [
                { title: "Male", value: "Male" },
                { title: "Female", value: "Female" }
            ]
        }
    ])

    const quaryParameter = Object.entries(userInput)
    let withName = "?" + quaryParameter[0][0] + "=" + quaryParameter[0][1] +
        "&" + quaryParameter[1][0] + "=" + quaryParameter[1][1] + "&" + quaryParameter[2][0] + "=" + quaryParameter[2][1]
    
    let noName = "?" + quaryParameter[1][0] + "=" + quaryParameter[1][1] + "&" + quaryParameter[2][0] + "=" + quaryParameter[2][1]

    if (!quaryParameter[0][1])
        return noName

    return withName

}

async function fetchAnimals() {
    try {
        let time = Number(localStorage.getItem('exp'))
        let now = Math.floor(Date.now() / 1000)
        let getInput = await getPets()
        if (time < now) {
            sendReq()
        }

        let grant = localStorage.getItem('fullToken')
        let a = `https://api.petfinder.com/v2/animals${getInput}`
        const head = {
            Authorization: `Bearer ${grant}`
        };

        const response:Response = await fetch(a, { method: 'GET', headers: head })
        const data: Root = await response.json()
        let collect = data.animals.map((a: Animal) => ({ title: a.name, value: a.id }))
        localStorage.setItem('bookmark', JSON.stringify(collect))
        
    }
    catch (error) {
        console.log(error)
    }
}

async function getPetsById() {
    await fetchAnimals()
    let choice:BookType = JSON.parse(localStorage.getItem("bookmark") || "[]") 
    const userInput = await prompts([
        {
            type: "select",
            name: "type",
            message: "select animal type",
            choices: choice
        }])
    const quaryParameter:BookType[] = Object.entries(userInput)
    let quary = quaryParameter[0][1]

    return quary.value
}

async function fetchAnimalsById() {

    let getInput = await getPetsById()
    let grant = localStorage.getItem('fullToken')
    let a = `https://api.petfinder.com/v2/animals/${getInput}`
    const head = {
        Authorization: `Bearer ${grant}`
    };
 const response:Response = await fetch(a, { method: 'GET', headers: head })
    const data:base = await response.json()
    let store: st[] = [];
    store.push({
      typed: data.animal.type,
      named: data.animal.name,
      breed: data.animal.breeds.primary,
      size: data.animal.size,
      age: data.animal.age,
      color: data.animal.colors.primary,
      Status: data.animal.status,
    });

    localStorage.setItem('SelectedAnimal', JSON.stringify(store))
}

async function displayAnimal(){
   await fetchAnimalsById() 
   let dataf:st[] = JSON.parse(localStorage.getItem("SelectedAnimal") || '[]')
    dataf.forEach(data=>console.log(`
Here is your ${data.typed} details
    Name : ${data.named} 
    Breed : ${data.breed }
    Size : ${data.size }
    Age : ${data.age}
    Color: ${data.color }
    Status : ${data.Status}`))
   
}

function displayBookmark(){
    let saved:BookType = JSON.parse(localStorage.getItem("bookmark") || "[]") 
    if(!saved)
        console.log('Bookmark empty')
    else
        saved.forEach((s:BookTypeObject)=> console.log(s))
}

async function Menu() {
    const userInput = await prompts([
        {
            type: "text",
            name: "name",
            message: "Enter 1 to find new Pet or 2 to see bookmark list or 3 to Exit ",
            validate: (value: string) => (value !== "1" && value !== "2" && value !== "3") ? "Please enter either 1 or 2" : true,
        }
    
    ])
    if (userInput.name === "1") {
       await displayAnimal()
      } else if (userInput.name === "2") {
        displayBookmark()
      } else if (userInput.name === "3") {
        console.log("Exiting...");
        return
      }
    Menu()
    }
Menu()