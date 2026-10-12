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
}

export interface RandomUserApiResult {
  login: RandomUserApiLogin;
  name: RandomUserApiName;
  email: string;
  picture: RandomUserApiPicture;
  gender: string;
  location: RandomUserApiLocation;
}

export interface RandomUserApiResponse {
  results: RandomUserApiResult[];
}
