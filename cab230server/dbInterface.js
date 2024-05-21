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

    async getVolcanoesWithPopulationFilter(country, populationFilter) {
        let volcanoes = [];
        
        let populationColumn
        switch(populationFilter) {
            case '5km':
                populationColumn = 'population_5km';
                break;
            case '10km':
                populationColumn = 'population_10km';
                break;
            case '30km':
                populationColumn = 'population_30km';
                break;
            case '100km':
                populationColumn = 'population_100km';
                break;
            default:
                populationColumn = null;
                break;
        }

        if (populationColumn == null) {
            return null;
        }

        let response = await knex.select().from('data')
            .where('country', country)
            .whereNot(populationColumn, '<' , 1);

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