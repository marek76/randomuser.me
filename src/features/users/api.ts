import type { RandomUserApiResponse } from './apiTypes';
import type { Gender, User } from './types';

const RESULTS = 18;
const API_URL = `https://randomuser.me/api/?results=${RESULTS}`;

function toGender(value: string): Gender {
  return value === 'female' ? 'female' : 'male';
}

export async function fetchUsersFromApi(): Promise<User[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Nepodařilo se načíst uživatele');
  }

  const data: RandomUserApiResponse = await response.json();

  return data.results.map((r) => ({
    id: r.login.uuid,
    name: r.name,
    email: r.email,
    picture: r.picture.thumbnail,
    gender: toGender(r.gender),
    country: r.location.country,
  }));
}
