export type Root = {
    animals: Animal[]
  }
  
  export type Animal = {
    id: number
    type: string
    species: string
    breeds: Breeds
    colors: Colors
    age: string
    gender: string
    size: string
    name: string
    status: string

  }
  
  export type Breeds = {
    primary: string
    secondary?: string
    mixed: boolean
    unknown: boolean
  }
  
  export type Colors = {
    primary?: string
    secondary?: string
    tertiary: any
  }
  
export type forKey = {
    [key: string]: string }


export type st = {
    id:number,
    typed: string
    named: string
    breed: string
    size: string
    age: string
    color: string | undefined
    Status: string

}
  export interface base {
    animal: Animal
  }
  
  
export type APIToken = {
    "token_type": string, "expires_in": number, "access_token": string
}

export type JWTType = { exp: number, aud: string, jti: string };
 
  