const Promis= fetch("https://api.petfinder.com/v2/oauth2/token",{ method:"post", headers:{"Content-Type": "application/json"},
                        body:JSON.stringify({  grant_type: 'client_credentials',
                        client_id: '9ZeAJ8bq9iRpaN5vGoXr7WJYfEMUm0Ir5jsdfTZqrTKSFWuT1Q',
                        client_secret: 'EKCklXdaxkyEmCh6KWlpffC5KXWUhD7oim88Hwls',})});
Promis
    .then(a => a.json())
    .then(b=> console.log(b))