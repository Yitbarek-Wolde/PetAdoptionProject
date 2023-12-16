import { jwtDecode } from "jwt-decode";
type JWTType = { exp: number, aud: string, jti: string};

const token = "eyJhsw5c...";
const decoded = jwtDecode<JWTType>(token);
//changed
async function searchPets(name, type, gender) {
  const url = `https://api.petfinder.com/v2/animals/:id`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getPetDetails(id) {
  const url = `https://api.petadopt.ca/pets/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

(async () => {
  const pets = await searchPets('Theo', 'Dog', 'Male');
  const petNames = pets.map(pet => pet.name);
  console.log(`Here are the pets that match your search criteria: ${petNames.join(', ')}`);

  const selectedPet = pets[0];
  const petDetails = await getPetDetails(selectedPet.id);
  console.log(`Here are the details for ${selectedPet.name}:`);
  console.log(`Breed: ${petDetails.breed}`);
  console.log(`Size: ${petDetails.size}`);
  console.log(`Age: ${petDetails.age}`);
  console.log(`Color: ${petDetails.color}`);
  console.log(`Status: ${petDetails.status}`);
})();
