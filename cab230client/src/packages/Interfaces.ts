import Volcano from "./Volcano";

export interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}


export interface Country {
  name: string;
  code: string;
  volcanoes: Volcano[];
}

export interface IVolcano {
  id?: number;
  name: string;
  country: string;
  region: string;
  subregion: string;
  last_eruption?: string;
  summit?: number;
  elevation?: number;
  latitude?: number;
  longitude?: number;
  population_5km?: number;
  population_10km?: number;
  population_30km?: number;
  population_100km?: number;
}