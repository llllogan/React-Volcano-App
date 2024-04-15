import { ILoginResponse, IRegisterResponse, IVolcano, LoginResponse, RegisterResponse } from './Interfaces';
import Volcano from './Volcano';

export default class VolcanoApiClient {

    // Base URL for the API
    private baseUrl: string = "http://4.237.58.241:3000";

    private bearerToken: string = "";

    private username: string = "";

    private password: string = "";

    private loggedIn: boolean = false;

    private radiusFilter: string = "";

    constructor(data: {
        token?: string;
    }) {
        if (data.token !== undefined) {
            this.bearerToken = data.token;
            this.loggedIn = true;
        }
    }

    public getUserInfo() {
        return {
            username: this.username,
            password: this.password,
            loggedIn: this.loggedIn
        };
    }

    private setRadiusFilter(radius: number) {

        // If the radius is 101, set the filter to an empty string
        if (radius === 101) {
            this.radiusFilter = "";
            return;
        }

        const radiusAsString = radius.toString();
        this.radiusFilter = `${radiusAsString}km`
    }

    // Function to get a list of Countries from the API
    public async getCountries() {
        const response = await fetch(`${this.baseUrl}/countries`);
        const data = await response.json() as string[];
        return data;
    }
    
    // Function to get a list of all volcanoes
    public async getVolcanoes(country: string, radius: number) {

        this.setRadiusFilter(radius);

        let queryParameterString = `?country=${country}`;
        if (this.radiusFilter !== "") {
            queryParameterString += `&populatedWithin=${this.radiusFilter}`;
        }

        const response = await fetch(`${this.baseUrl}/volcanoes${queryParameterString}`);
        const data = await response.json() as IVolcano[];

        // Convert the data array to an array of Volcano objects
        const volcanoes = data.map((volcano) => {
            return new Volcano(volcano);
            console.log("I have gotten this from the api", volcano);
        });

        if (response.status !== 200) {
            console.log(response);
        }
        return volcanoes;
    }

    // Function to get a single volcano by its ID
    public async getVolcanoById(id: number) {

        let returnedData: IVolcano;
        // If a token is provided, add it to the request headers
        if (this.bearerToken !== "") {
            const response = await fetch(`${this.baseUrl}/volcano/${id}`, {
                method: 'GET',
                headers: {
                    'Authentication': `Bearer ${this.bearerToken}`
                }
            });
            returnedData = await response.json() as IVolcano;
        } else {
            const response = await fetch(`${this.baseUrl}/volcano/${id}`);
            returnedData = await response.json() as IVolcano;
        }

        console.log("I have gotten this from the api", returnedData);

        return new Volcano(returnedData);
    }


    public async getToken(username: string, password: string) {

        const registerResponse = await this.register(username, password);

        // If there was an error registering the user, return an empty string
        if (registerResponse.hasError()) {
            console.log("There was an error registering the user");
            console.log(registerResponse.message);
            return "";
        }

        // Some logging
        if (registerResponse.userAlreadyExists()) {
            console.log("User already exists");
        } else if (registerResponse.userCreated()) {
            console.log("User created");
        }

        const loginResponse = await this.logIn(username, password);

        // If there was an error logging in, return an empty string
        if (loginResponse.hasError()) {
            console.log("There was an error logging in");
            console.log(loginResponse.message);
            return "";
        } else if (loginResponse.invalidCredentials()) {
            console.log("Invalid credentials");
            return "";
        }

        const token: string = loginResponse.getToken();

        return token;
    }



    // Function to create a user account
    private async register(username: string, password: string) {
        const response = await fetch(`${this.baseUrl}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: username, password: password })
        });
        const responseMessage = await response.json() as IRegisterResponse;
        return new RegisterResponse(responseMessage);
    }

    // Function to get bearer token for a user
    private async logIn(username: string, password: string) {
        const response = await fetch(`${this.baseUrl}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: username, password: password })
        });
        const responseMessage = await response.json() as ILoginResponse;
        return new LoginResponse(responseMessage);
    }

}