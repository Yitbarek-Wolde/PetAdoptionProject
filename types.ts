export type Root = {
    animals: Animal[]
    pagination: Pagination
  }
  
  export type Animal = {
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
    coat?: string
    attributes: Attributes
    environment: Environment
    tags: string[]
    name: string
    description?: string
    organization_animal_id?: string
    photos: Photo[]
    primary_photo_cropped?: PrimaryPhotoCropped
    videos: any[]
    status: string
    status_changed_at: string
    published_at: string
    distance: any
    contact: Contact
    _links: Links
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
  
  export type Attributes = {
    spayed_neutered: boolean
    house_trained: boolean
    declawed?: boolean
    special_needs: boolean
    shots_current: boolean
  }
  
  export type Environment = {
    children?: boolean
    dogs?: boolean
    cats?: boolean
  }
  
  export type Photo = {
    small: string
    medium: string
    large: string
    full: string
  }
  
  export type PrimaryPhotoCropped = {
    small: string
    medium: string
    large: string
    full: string
  }
  
  export type Contact = {
    email: string
    phone?: string
    address: Address
  }
  
  export type Address = {
    address1?: string
    address2: any
    city: string
    state: string
    postcode: string
    country: string
  }
  
  export type Links = {
    self: Self
    type: Type
    organization: Organization
  }
  
  export type Self = {
    href: string
  }
  
  export type Type = {
    href: string
  }
  
  export type Organization = {
    href: string
  }
  
  export type Pagination = {
    count_per_page: number
    total_count: number
    current_page: number
    total_pages: number
    _links: Links2
  }
  
  export type Links2 = {
    next: Next
  }
  
  export type Next = {
    href: string
  }
  