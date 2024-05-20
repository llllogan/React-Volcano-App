const config = require('./knexfile')['development'];
const knex = require('knex')(config);
// module.exports = knex;

class DbClient {
    constructor(knex) {
        this.knex = knex;
    }

    async getCountriesList() {
        let countries = [];
        let response = await knex.select().distinct('country').from('data');

        response.forEach((row) => {
            countries.push(row.country);
        });

        return countries;
    }
}


const dbClient = new DbClient(knex);
module.exports = dbClient;