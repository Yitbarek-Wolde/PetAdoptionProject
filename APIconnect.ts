import { jwtDecode } from "jwt-decode";
import fetch, { Response } from 'cross-fetch';
import { LocalStorage } from "node-localstorage";

export type APIToken = {
    "token_type": string, "expires_in": number, "access_token": string
}

export type AccessToken = {
    aud: string,
    jti: string,
    iat: number,
    nbf: number,
    exp: number,
    sub: string,
    scopes: []

}

type JWTType = { exp: number, aud: string, jti: string};

async function getPetfinderAccessToken(clientId: string, clientSecret: string) {
    const url = 'https://api.petfinder.com/v2/oauth2/token';

    const data = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
    });

    let localStorage = new LocalStorage("./scratch");

    const response: Response = await fetch(url, { method: 'POST', body: data })

    const data_f: APIToken = await response.json()
    const token: JWTType = jwtDecode<JWTType>(data_f.access_token)
    localStorage.setItem("fullToken", data_f.access_token)
   localStorage.setItem('exp', JSON.stringify(token.exp))

}

export async function sendReq() {
    const clientId = '9ZeAJ8bq9iRpaN5vGoXr7WJYfEMUm0Ir5jsdfTZqrTKSFWuT1Q';
    const clientSecret = 'EKCklXdaxkyEmCh6KWlpffC5KXWUhD7oim88Hwls';

    getPetfinderAccessToken(clientId, clientSecret);
}

