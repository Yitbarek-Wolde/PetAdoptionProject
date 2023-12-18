import { jwtDecode } from "jwt-decode";
import fetch, { Response } from 'cross-fetch';

type APIToken = {"token_type": string, "expires_in": number, "access_token": string 
  }
    
type AccessToken= {
        aud: string,
        jti: string,
        iat: number,
        nbf: number,
        exp: number,
        sub: string,
        scopes: []
      
  }
  
  async function getPetfinderAccessToken(clientId: string, clientSecret: string): Promise<AccessToken> {
    const url = 'https://api.petfinder.com/v2/oauth2/token';
  
    const data = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    });
  

    const response: Response = await fetch(url, {method: 'POST',body: data})

    const data_f:APIToken = await response.json()
    const token:AccessToken = jwtDecode(data_f.access_token)
    
    return token
  }

 export async function sendReq() {
    const clientId = '9ZeAJ8bq9iRpaN5vGoXr7WJYfEMUm0Ir5jsdfTZqrTKSFWuT1Q';
    const clientSecret = 'EKCklXdaxkyEmCh6KWlpffC5KXWUhD7oim88Hwls';
  
    const token = await getPetfinderAccessToken(clientId, clientSecret);
   return token
  }
  
 