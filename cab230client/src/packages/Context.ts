import { Dispatch, SetStateAction, createContext } from "react";
import { User, Country, IVolcano } from "./Interfaces";
import VolcanoApiClient from "./VolcanoClient";

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
  selectedVolcano: IVolcano;
  setSelectedVolcano: Dispatch<SetStateAction<IVolcano>>;
}

export const VolcanoContext = createContext<VolcanoContextType | null>(null);

export interface VolcanoSelectedContextType {
  volcanoSelected: boolean;
  setVolcanoSelected: Dispatch<SetStateAction<boolean>>;
}

export const VolcanoSelectedContext = createContext<VolcanoSelectedContextType | null>(null);

export interface VolcanoClientContextType {
  volcanoClient: VolcanoApiClient;
  setVolcanoClient: Dispatch<SetStateAction<VolcanoApiClient>>;
}

export const VolcanoClientContext = createContext<VolcanoClientContextType | null>(null);
