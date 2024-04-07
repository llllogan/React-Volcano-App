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