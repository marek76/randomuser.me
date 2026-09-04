export type Gender = 'male' | 'female';

type Name = {
  title: string,
  first: string,
  last: string,
}

export interface User {
    id: string;
    name: Name;
    email: string;
    picture: string;
    gender: Gender;
    country: string;
}