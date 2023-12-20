export {
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
};

type Breeds = {
  primary?: string |null
  secondary?: string;
  mixed: boolean;
  unknown: boolean;
};
type Colors = {
  primary: string | null;
  secondary: null | string;
  tertiary: null | string;
};
type Animal = {
  id: number;
  //type: string;
  //species: string;
  name: string;
  //gender: string;
  size: string;
  age: string;
  breeds: Breeds;
  colors: Colors;
  status: string;
};
type Anim = { animals: Animal };
type Root = { animals: Animal[] };

type JWTType = { exp: number; aud: string; jti: string };

type BookmarkTypeobj = {
  title: string;
  value: number;
};
type BookmarkType = BookmarkTypeobj[];

type pet = {
  id: number;
  organization_id: string;
  url: string;
  type: string;
  species: string;
  breeds: Breeds;
  colors: Colors;
  age: string;
  gender: string;
  size: string;
  coat: string;
  tags: string[];
  name: string;
  description: any;
  organization_animal_id: any;
  status: string;
  status_changed_at: string;
  published_at: string;
};


    

 type animalDetail = {
    id: number;
    typed: string;
    named: string;
    breed: string | null;
    size: string;
    age: string;
    color: string | null;
    Status: string;
  };
  type base = {
    animal: Animal
  }