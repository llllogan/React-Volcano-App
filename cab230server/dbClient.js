const config = require('./knexfile')['development'];
const knex = require('knex')(config);

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

    async getCountriesByFilter(filter, value, exactMatch) {
        let countries = [];
        let response = null;

        if (exactMatch) {
            response = await knex.select().distinct('country').from('data').where(filter, value);

        } else {
            response = await knex.select().distinct('country').from('data').where(filter, 'like', `%${value}%`);
        }
        
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

    async getVolcanoById(id) {
        let response = await knex.select().from('data').where('id', id);
        if (response.length == 0) {
            return null;
        } else {
            return response[0];
        }
    }

    async getReviewsForVolcano(id) {
        let reviews = [];
        let response = await knex.select().from('reviews').where('volcanoId', id);

        response.forEach((row) => {
            let review = {
                id: row.id,
                userId: row.userId,
                title: row.title,
                rating: row.rating,
                comment: row.description
            }

            reviews.push(review);
        });

        return reviews;
    }

    async getVolcanoReviewById(reviewId) {
        let response = await knex.select().from('reviews').where('id', reviewId);
        if (response.length == 0) {
            return null;
        } else {
            return response[0];
        }
    }


    async addReiviewForVolcano(userId, volcanoId, title, rating, comment) {
        try {
            await knex('reviews').insert({volcanoId: volcanoId, userId: userId, title: title, rating: rating, description: comment});
        } catch (error) {
            return error;
        }
    }

    async updateFieldOfVolcanoReview(id, key, value) {

        if (key == 'comment') {
            key = 'description';
        }

        try {
            await knex('reviews').where('id', id).update(key, value);
        } catch (error) {
            return error;
        }
    }

    async getUserByEmail(email) {
        let response = await knex.select().from('users').where('email', email);
        if (response.length == 0) {
            return null;
        } else {
            return response[0];
        }
    }

    async createUser(email, password) {
        await knex('users').insert({email: email, password: password});
    }

    async updateUser(id, email, firstName, lastName, dob, address) {
        await knex('users').where('id', id).update({email: email, firstName: firstName, lastName: lastName, dob: dob, address: address});
    }
}


const dbClient = new DbClient(knex);
module.exports = dbClient;