import Volcano from './Volcano';

class VolcanoApiClient {

    // Base URL for the API
    private baseUrl: string = "http://4.237.58.241:3000";

    // Function to get a list of Countries from the API
    public async getCountries(): Promise<string[]> {
        const response = await fetch(`${this.baseUrl}/countries`);
        const data = await response.json();
        return data;
    }
    
    // Function to get a list of all volcanoes
    public async getVolcanoes(): Promise<Volcano[]> {
        const response = await fetch(`${this.baseUrl}/volcanoes`);
        const data = await response.json();
        return data;
    }

    // Function to get a single volcano by its ID
    public async getVolcanoById(id: number, token?: string): Promise<Volcano> {

        let returnedData: Volcano;
        // If a token is provided, add it to the request headers
        if (token) {
            const response = await fetch(`${this.baseUrl}/volcano/${id}`, {
                method: 'GET',
                headers: {
                    'Authentication': `Bearer ${token}`
                }
            });
            returnedData = await response.json();
        } else {
            const response = await fetch(`${this.baseUrl}/volcano/${id}`);
            returnedData = await response.json();
        }

        return returnedData;
    }

    // Function to create a user account
    public async createUser(username: string, password: string): Promise<boolean> {
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
    public async getToken(username: string, password: string): Promise<string> {
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

export default VolcanoApiClient;