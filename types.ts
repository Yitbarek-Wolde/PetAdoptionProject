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
  
export type BookType = BookTypeObject[]

export interface BookTypeObject {
  title: string
  value: number
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
  
  export interface pet {
    id: number
    organization_id: string
    url: string
    type: string
    species: string
    breeds: Breeds
    colors: Colors
    age: string
    gender: string
    size: string
    coat: string
    tags: string[]
    name: string
    description: any
    organization_animal_id: any
    status: string
    status_changed_at: string
    published_at: string
  }
  
export type APIToken = {
    "token_type": string, "expires_in": number, "access_token": string
}

export type JWTType = { exp: number, aud: string, jti: string };
 
  