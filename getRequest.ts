import prompts from "prompts";
import { access_token } from "./bootstrap";
import fetch, { Response } from "cross-fetch";
import { LocalStorage } from "node-localstorage";

import {
  Breeds,
  Colors,
  Animal,
  Root,
  JWTType,
  BookmarkTypeobj,
  BookmarkType,
  pet,
  Anim,
  animalDetail,
} from "./type";
import { ChildProcess } from "child_process";
import { postRequest } from "./postRequest";
const localStorage = new LocalStorage("./scratch");

export async function getRequest() {
  const userInput = await prompts([
    {
      type: "text",
      name: "name",
      message: "Enter animal name",
    },
    {
      type: "select",
      name: "type",
      message: "select animal type",
      choices: [
        { title: "Dog", value: "Dog" },
        { title: "cat", value: "Cat" },
      ],
    },
    {
      type: "select",
      name: "gender",
      message: "select animal gender",
      choices: [
        { title: "Male", value: "Male" },
        { title: "Female", value: "Female" },
      ],
    },
  ]);

  const quaryParameter = Object.entries(userInput);
  const queryString = quaryParameter
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const quarywithOutName =
    quaryParameter[1][0] +
    "=" +
    quaryParameter[1][1] +
    "&" +
    quaryParameter[2][0] +
    "=" +
    quaryParameter[2][1];

  localStorage.setItem("quary_Parameter", JSON.stringify(queryString));
  if (!quaryParameter[0][1]) {
    return quarywithOutName;
  }
  return quaryParameter;
}

async function fetchAnimals() {
  let quary_param = await getRequest();
  let url = `https://api.petfinder.com/v2/animals?${quary_param}`;
  const fetchAnimal: Response = await fetch(url, {
    method: "Get",
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const objresponse: Root = await fetchAnimal.json();
  let listoFAnimales = objresponse.animals.map((ele: Animal) => ({
    value: ele.id,
    title: ele.name,
  }));

  localStorage.setItem("bookmark", JSON.stringify(listoFAnimales));
  console.log(listoFAnimales); //[[]]
  return listoFAnimales;
}

async function getpetsById() {
  let select = await fetchAnimals();

  const userInputTwo = await prompts([
    {
      type: "select",
      name: "type",
      message: "select animal type",
      choices: select,
    },
  ]);

  let quaryParamter = Object.entries(userInputTwo);
  const quary = quaryParamter[0][1];
  localStorage.setItem("Id_quary", JSON.stringify(quaryParamter));
  //return quary;
}

async function fetchAnimalsById() {
await getpetsById();
    const localStorage = new LocalStorage("./scratch");
    const idQuaryString = localStorage.getItem("Id_quary");
    const idQuaryArray = JSON.parse(idQuaryString || "[]");
    const Id_quary = idQuaryArray[0][1];
    let a = `https://api.petfinder.com/v2/animals/${Id_quary}`
    const head = {
        Authorization: `Bearer ${access_token}`
    };
    const response: Response = await fetch(a, { method: 'GET', headers: head })
  
   
    const data: base = await response.json()
    localStorage.setItem('fullRes', JSON.stringify(data))
    let store: animalDetail[] = [];
    store.push({
        id: data.animal.id,
        typed: data.animal.name,
        named: data.animal.name,
        breed: data.animal.breeds.primary||null,
        size: data.animal.size,
        age: data.animal.age,
        color: data.animal.colors.primary||null,
        Status: data.animal.status,
    })

    localStorage.setItem('Selected_Animal', JSON.stringify(store))
}

async function displayAnimal() {
  await fetchAnimalsById();
  let dataf: animalDetail[] = JSON.parse(
    localStorage.getItem("SelectedAnimal") || "[]"
  );
  dataf.forEach((data) =>
    console.log(`
    Here is the detail of the  ${data.typed} details
        Name : ${data.named} 
        Breed : ${data.breed}
        Size : ${data.size}
        Age : ${data.age}
        Color: ${data.color}
        Status : ${data.Status}`)
  );
}

displayAnimal();
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
function saveBookMark() {
    let saved: { [id: string]: string }[] = JSON.parse(localStorage.getItem("Bookmark") || "[]")
    let add: animalDetail[] = JSON.parse(localStorage.getItem("SelectedAnimal") || '[]')
    saved.push({ [add[0].id]: add[0].named });
    localStorage.setItem('Bookmark', JSON.stringify(saved))
}
function deleteFromBookmark(id: string) {
    let saved: { [id: string]: string }[] = JSON.parse(localStorage.getItem("Bookmark") || "[]");
    if (saved.some(bookmark => bookmark[id])) {
        saved = saved.filter(bookmark => !bookmark[id]);
        localStorage.setItem('Bookmark', JSON.stringify(saved));
        console.log('Deleted Sucessfully!')
    } else
        console.log(`id ${id} not foun in bookmark!`)
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
        let time = Number(localStorage.getItem('exp'))
        let now = Math.floor(Date.now() / 1000)
        if (time < now) {
            await postRequest()
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
