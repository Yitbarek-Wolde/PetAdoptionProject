import { jwtDecode } from "jwt-decode";
import fetch, { Response } from 'cross-fetch';
import { LocalStorage } from "node-localstorage";
import { APIToken, JWTType} from "./types";




async function getPetfinderAccessToken(clientId: string, clientSecret: string) {
   try{
    const url = 'https://api.petfinder.com/v2/oauth2/token';

    const data = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
    });

    let localStorage = new LocalStorage("./scratch");

    const response: Response = await fetch(url, { method: 'POST', body: data })
    const data_recived: APIToken = await response.json()
    const token: JWTType = jwtDecode<JWTType>(data_recived.access_token)
    localStorage.setItem("fullToken", data_recived.access_token)
    localStorage.setItem('exp', JSON.stringify(token.exp))
}catch(error){
    console.log(error)
        console.log(`Redirecting... Stay calm`)
        sendRequest()
}

}

export function sendRequest() {
    const clientId = '9ZeAJ8bq9iRpaN5vGoXr7WJYfEMUm0Ir5jsdfTZqrTKSFWuT1Q';
    const clientSecret = 'EKCklXdaxkyEmCh6KWlpffC5KXWUhD7oim88Hwls';

    getPetfinderAccessToken(clientId, clientSecret);
}

