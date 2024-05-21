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

    async getVolcanoesInCountry(country) {
        let volcanoes = [];
        let response = await knex.select().from('data').where('country', country);

        response.forEach((row) => {

            let volcano = {
                id: row.id,
                name: row.name,
                country: row.country,
                region: row.region,
                subregion: row.subregion
            }

            volcanoes.push(volcano);
        });

        return volcanoes;
    }
}


const dbClient = new DbClient(knex);
module.exports = dbClient;