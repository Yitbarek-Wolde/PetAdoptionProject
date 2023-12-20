import prompts from "prompts";
import fetch, { Response } from 'cross-fetch';
import { sendReq} from "./APIconnect";
import { LocalStorage } from "node-localstorage";
import { Root, Animal, base, st, forKey } from "./types";



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

    const quaryParameter:[string, string][] = Object.entries(userInput)
    let withName = "?" + quaryParameter[0][0] + "=" + quaryParameter[0][1] +
        "&" + quaryParameter[1][0] + "=" + quaryParameter[1][1] + "&" + quaryParameter[2][0] + "=" + quaryParameter[2][1]

    let noName = "?" + quaryParameter[1][0] + "=" + quaryParameter[1][1] + "&" + quaryParameter[2][0] + "=" + quaryParameter[2][1]

    if (!quaryParameter[0][1])
        return noName

    return withName

}

async function fetchAnimals() {
    try {

        let getInput = await getPets()
        let grant = localStorage.getItem('fullToken')
        let a = `https://api.petfinder.com/v2/animals${getInput}`
        const head = { Authorization: `Bearer ${grant}` };

        const response: Response = await fetch(a, { method: 'GET', headers: head })
        const data: Root = await response.json()
        //console.log(data)
        let collect: { [id: string]: string }[] = data.animals.map((a: Animal) => ({ [a.id]: a.name }))
        localStorage.setItem('tempo', JSON.stringify(collect))

    }
    catch (error) {
        console.log(error)
        console.log(`Redirecting... Stay calm`)
        Menu()
    }
}

async function getPetsById() {
    try{
    await fetchAnimals()
    let choice: {[id:string]:string}[] = JSON.parse(localStorage.getItem("tempo") || "[]")
    const choices = choice.map((item: forKey) => {
        const key = Object.keys(item)[0];
        return { title: item[key], value: parseInt(key) }
    });
    const userInput = await prompts([
        {
            type: "select",
            name: "type",
            message: "select animal type",
            choices,
        }])
    const quaryParameter:[string, number][]  = Object.entries(userInput)
    let quary: number = quaryParameter[0][1]
   console.log(quaryParameter)
   console.log(quary)
    return quary
    }catch(error){
        console.log(error)
        Menu()
    }
}

async function fetchAnimalsById() {
try{
    let getInput = await getPetsById()
    let grant = localStorage.getItem('fullToken')
    let a = `https://api.petfinder.com/v2/animals/${getInput}`
    const head = {
        Authorization: `Bearer ${grant}`
    };
    const response: Response = await fetch(a, { method: 'GET', headers: head })
    const data: base = await response.json()
  //  localStorage.setItem('fullRes', JSON.stringify(data))
    let store: st[] = [];
    store.push({
        id: data.animal.id,
        typed: data.animal.name,
        named: data.animal.name,
        breed: data.animal.breeds.primary,
        size: data.animal.size,
        age: data.animal.age,
        color: data.animal.colors.primary,
        Status: data.animal.status,
    })

    localStorage.setItem('SelectedAnimal', JSON.stringify(store))
}catch(error){
    console.error(error)
    console.log(`Redirecting... Stay calm`)
    Menu()
}
}
async function displayAnimal() {
    await fetchAnimalsById()
    let dataf: st[] = JSON.parse(localStorage.getItem("SelectedAnimal") || '[]')
    dataf.forEach(data => console.log(`
    Here is your ${data.typed} details
        Name : ${data.named} 
        Breed : ${data.breed}
        Size : ${data.size}
        Age : ${data.age}
        Color: ${data.color}
        Status : ${data.Status}`))

    await displayBookmark()
}

function saveBookMark() {
    let saved: { [id: string]: string }[] = JSON.parse(localStorage.getItem("Bookmark") || "[]")
    let add: st[] = JSON.parse(localStorage.getItem("SelectedAnimal") || '[]')
    saved.push({ [add[0].id]: add[0].named });
    localStorage.setItem('Bookmark', JSON.stringify(saved))
    console.log('Saved Sucessfully!')

}

function deleteFromBookmark(id: string) {
    let saved: { [id: string]: string }[] = JSON.parse(localStorage.getItem("Bookmark") || "[]");
    if (saved.some(bookmark => bookmark[id])) {
        saved = saved.filter(bookmark => !bookmark[id]);
        localStorage.setItem('Bookmark', JSON.stringify(saved));
        console.log('Deleted Sucessfully!')
    } else
        console.log(`id ${id} not found in bookmark!`)
}


async function displayBookmark() {
    const userInput = await prompts([
        {
            type: "text",
            name: "name",
            message: "Press 1 to bookmark pet or 2 to view bookmark or 3 to delete from bookmark or any key to go to menu",
        }

    ])
    let saved: { [id: string]: string }[] = JSON.parse(localStorage.getItem("Bookmark") || "[]")
    if (userInput.name === "1") {
        saveBookMark()
    }

    if (userInput.name === "2") {
        console.log("Here are the list of your bookmarks")
        saved.forEach((s: { [id: string]: string }) => console.log(s))

    }
    if (userInput.name === "3") {
        saved.forEach((s: { [id: string]: string }) => console.log(s))
        const id = await prompts([
            {
                type: "text",
                name: "name",
                message: "Enter pet id to delete",
            }])
        deleteFromBookmark(id.name)
    }
}

export async function Menu() {
    const userInput = await prompts([
        {
            type: "text",
            name: "name",
            message: "Enter 1 to find new Pet or 2 to see bookmark list or 3 to Exit ",
            validate: (value: string) => (value !== "1" && value !== "2" && value !== "3") ? "Please enter either 1 or 2" : true,
        }])

    if (userInput.name === "1") {
        let time = Number(localStorage.getItem('exp'))
        let now = Math.floor(Date.now() / 1000)
        if (time < now) {
            await sendReq()
            }
        await displayAnimal()
    }


    else if (userInput.name === "2")
        await displayBookmark()

    else {
        console.log("Exiting...");
        return
    }

    Menu()
}
Menu()