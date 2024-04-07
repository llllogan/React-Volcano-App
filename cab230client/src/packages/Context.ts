import { Dispatch, SetStateAction, createContext } from "react";
import { User, Country } from "./Interfaces";

export interface UserContextType {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export interface CountryContextType {
  selectedCountry: Country;
  setSelectedCountry: Dispatch<SetStateAction<Country>>;
}

export const CountryContext = createContext<CountryContextType | null>(null);
