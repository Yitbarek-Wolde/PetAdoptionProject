import prompts from "prompts";
import fetch, { Response } from 'cross-fetch';
import { sendReq, AccessToken, APIToken } from "./APIconnect";
import { LocalStorage } from "node-localstorage";
import { Root, Animal } from "./types";

let localStorage = new LocalStorage("./scratch");
async function getPets() {
    const userInput = await prompts([
        {
            type: "text",
            name: 'name',
            message: 'Enter animal name',
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
   let quary = "?" + quaryParameter[0][0] + "=" + quaryParameter[0][1] +
        "&" + quaryParameter[1][0] + "=" + quaryParameter[1][1] + "&" + quaryParameter[2][0] + "=" + quaryParameter[2][1]
    console.log(quary)
    let noname = "?" + quaryParameter[1][0] + "=" + quaryParameter[1][1] + "&" + quaryParameter[2][0] + "=" + quaryParameter[2][1]
    
    if(!quaryParameter[0][1])
        return noname
    return quary

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

        const response = await fetch(a, { method: 'GET', headers: head })
        const data:Root = await response.json()
        let collect = data.animals.map((a: Animal) => ({title: a.name, value: a.id}))
        return collect
    }
    catch (error) {
        console.log(error)
    }
}

async function getPetsById() {
    let choice = await fetchAnimals()
    const userInput = await prompts([
        {
            type: "select",
            name: "type",
            message: "select animal type",
            choices: choice
        }])
        const quaryParameter = Object.entries(userInput)
   let quary = quaryParameter[0][1]
  
    return quary
    }

    async function fetchAnimalsById() {
        
    let getInput = await getPetsById()
            let grant = localStorage.getItem('fullToken')
            let a = `https://api.petfinder.com/v2/animals/${getInput}`
            const head = {
                Authorization: `Bearer ${grant}`
            };
    
            const response = await fetch(a, { method: 'GET', headers: head })
            const data:Animal = await response.json()
            console.log(data)
        
    }

    fetchAnimalsById()