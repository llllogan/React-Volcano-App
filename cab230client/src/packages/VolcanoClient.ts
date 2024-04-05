import Volcano from './Volcano';

class VolcanoApiClient {

    // Base URL for the API
    private baseUrl: string = "http://4.237.58.241:3000";

    private bearerToken: string = "";

    private username: string = "";

    private password: string = "";

    private loggedIn: boolean = false;

    public getUserInfo() {
        return {
            username: this.username,
            password: this.password,
            loggedIn: this.loggedIn
        };
    }

    // Function to get a list of Countries from the API
    public async getCountries() {
        const response = await fetch(`${this.baseUrl}/countries`);
        const data = await response.json() as string[];
        return data;
    }
    
    // Function to get a list of all volcanoes
    public async getVolcanoes() {
        const response = await fetch(`${this.baseUrl}/volcanoes`);
        const data = await response.json() as Volcano[];
        return data;
    }

    // Function to get a single volcano by its ID
    public async getVolcanoById(id: number) {

        let returnedData: Volcano;
        // If a token is provided, add it to the request headers
        if (this.bearerToken !== "") {
            const response = await fetch(`${this.baseUrl}/volcano/${id}`, {
                method: 'GET',
                headers: {
                    'Authentication': `Bearer ${this.bearerToken}`
                }
            });
            returnedData = await response.json() as Volcano;
        } else {
            const response = await fetch(`${this.baseUrl}/volcano/${id}`);
            returnedData = await response.json() as Volcano;
        }

        return returnedData;
    }


    public async getToken(username: string, password: string) {

        const signUpSuccess = await this.signUp(username, password);
        console.log("User created: ", signUpSuccess);

        this.bearerToken = await this.logIn(username, password);

        this.username = username;
        this.password = password;
        this.loggedIn = true;

    }



    // Function to create a user account
    private async signUp(username: string, password: string) {
        const response = await fetch(`${this.baseUrl}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: username, password: password })
        });
        return response.ok;
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
        const data = await response.json();
        return data.token;
    }

}

const volcanoClient = new VolcanoApiClient();

export default volcanoClient;