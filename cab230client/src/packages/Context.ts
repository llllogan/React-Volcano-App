import { Dispatch, SetStateAction, createContext } from "react";
import { User, Country } from "./Interfaces";
import Volcano from "./Volcano";

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

export interface VolcanoContextType {
  selectedVolcano: Volcano;
  setSelectedVolcano: Dispatch<SetStateAction<Volcano>>;
}

export const VolcanoContext = createContext<VolcanoContextType | null>(null);
