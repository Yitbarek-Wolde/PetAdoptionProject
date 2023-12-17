import { jwtDecode } from "jwt-decode";
import fetch, { Response } from 'cross-fetch';

type APIToken = {"token_type": string, "expires_in": number, "access_token": string 
  }
  
  const clientId = '9ZeAJ8bq9iRpaN5vGoXr7WJYfEMUm0Ir5jsdfTZqrTKSFWuT1Q';
  const clientSecret = 'EKCklXdaxkyEmCh6KWlpffC5KXWUhD7oim88Hwls';
  const url = 'https://api.petfinder.com/v2/oauth2/token';
  
  const data = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    })
   fetch(url, {method: 'POST',body: data})
      .then((response: Response) => response.json())
      .then((data:APIToken) => {
        const token = jwtDecode(data.access_token)
        const expirationDate = new Date().getTime() + data.expires_in * 1000;
         console.log(token, expirationDate);
      });
    