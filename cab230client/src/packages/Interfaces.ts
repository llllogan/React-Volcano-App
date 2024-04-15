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




export interface IRegisterResponse {
  error?: boolean;
  message: string;
}

export class RegisterResponse {
  error?: boolean;
  message: string;

  constructor(data: IRegisterResponse) {
    this.error = data.error;
    this.message = data.message;
  }

  public userAlreadyExists(): boolean {
    return this.message === "User already exists";
  }

  public hasError(): boolean {
    return this.error === true && this.userAlreadyExists() === false;
  }

  public userCreated(): boolean {
    return this.message === "User created";
  }

}

export interface ILoginResponse {
  error?: boolean;
  message?: string;
  token?: string;
  token_type?: string;
  expires_in?: number;
}

export class LoginResponse {
  error?: boolean;
  message?: string;
  token?: string;
  tokenType?: string;
  expiresIn?: number;

  constructor(data: ILoginResponse) {
    this.error = data.error;
    this.message = data.message;
    this.token = data.token;
    this.tokenType = data.token_type;
    this.expiresIn = data.expires_in;
  }

  public hasError(): boolean {
    return this.error === true;
  }

  public invalidCredentials(): boolean {
    return this.message === "Incorrect email or password";
  }

  public getToken(): string {

    if (this.token === undefined) {
      throw new Error("Token is undefined");
    }

    return this.token;
  }

}