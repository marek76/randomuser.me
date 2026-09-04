// features/users/apiTypes.ts

interface RandomUserApiName {
    title: string;
    first: string;
    last: string;
  }
  
  interface RandomUserApiLogin {
    uuid: string;
  }
  
  interface RandomUserApiPicture {
    large: string;
    medium: string;
    thumbnail: string;
  }
  
  interface RandomUserApiLocation {
    country: string;
    // API vrací i další pole (street, city, state, postcode, coordinates, timezone),
    // ale ty je nepoužíváš, takže je do typu nemusíš zahrnovat
  }
  
  export interface RandomUserApiResult {
    login: RandomUserApiLogin;
    name: RandomUserApiName;
    email: string;
    picture: RandomUserApiPicture;
    gender: string; // API vrací string, ne přesně 'male' | 'female' — viz poznámka níže
    location: RandomUserApiLocation;
  }
  
  export interface RandomUserApiResponse {
    results: RandomUserApiResult[];
  }