function requestMiddleware(req, res, next) {
  
    req.getQueryParams = function() {   
        // Return a dictionary of string, string
        // Return null if there isnt any

        let queryParams = req.query;
        if (Object.keys(queryParams).length > 0) {
            return queryParams;
        } else {
            return null;
        }
    }

    req.getQueryParamsLength = function() {
        // Return the number of query parameters
        // Return 0 if there isnt any

        let queryParams = req.query;
        return Object.keys(queryParams).length;
    }

    req.getQueryParamWithName = function(name) {
        // Return the value of the query parameter with the given name
        // Return null if there isnt any

        let queryParams = req.query;
        if (queryParams[name]) {
            return queryParams[name];
        } else {
            return null;
        }
    }

    req.getHeaders = function() {
        // Return a dictionary of string, string
        // Return null if there isnt any

        let headers = req.headers;
        if (Object.keys(headers).length > 0) {
            return headers;
        } else {
            return null;
        }
    }

    req.getHeaderWithName = function(name) {
        // Return the value of the header with the given name
        // Return null if there isnt any

        const specifiedHeader = req.headers[name.toLowerCase()];

        if (specifiedHeader) {
            return specifiedHeader;
        } else {
            return null;
        }
    }

    req.getEmailAndPassword = function() {
        // Get the email and password from the request body
        // Return an object with these fields
        // If either of them are missing, return null

        let email = req.body.email;
        let password = req.body.password;

        if (email && password) {
            return {email: email, password: password};
        } else {
            return null;
        }
    }

    req.getProfileInformation = function() {
        /* Get the request body and check it contains
            -   firstName
            -   lastName
            -   dob
            -   address        
        */
        // If any of these fields are not found, return null
        // If they are found, return that object

        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let dob = req.body.dob;
        let address = req.body.address;

        if (firstName && lastName && dob && address) {
            return {firstName: firstName, lastName: lastName, dob: dob, address: address};
        } else {
            return null;
        }
    }

    req.getVolcanoReviewFromBody = function() {
        // Get the request body and check it contains
        // -   title
        // -   rating
        // -   comment
        // Return an object with these fields
        // If any of these fields are not found, return null

        let title = req.body.title;
        let rating = req.body.rating;
        let comment = req.body.comment;

        if (title && rating && comment) {
            return {title: title, rating: rating, comment: comment};
        } else {
            return null;
        }
    }

    req.getPartialReviewFromBody = function() {
        // Get the request body and check it contains
        // -   id
        // -   title
        // -   rating
        // -   comment
        // Return an object with these fields
        // If any of these fields are not found, return null

        let hasValidFields = false;

        let title = req.body.title;
        let rating = req.body.rating;
        let comment = req.body.comment;

        let payload = {};

        if (title) {
            payload.title = title;
            hasValidFields = true;
        }
        if (rating) {
            payload.rating = rating;
            hasValidFields = true;
        }
        if (comment) {
            payload.comment = comment;
            hasValidFields = true;
        }

        if (!hasValidFields) {
            return null;
        }

        return payload;
    }

    next()
}

module.exports = requestMiddleware;