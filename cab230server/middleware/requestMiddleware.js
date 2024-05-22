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

    req.hasBearerToken = function() {
        // Check the request headers for an Authorization field

        let authHeader = req.getHeaderWithName('Authorization');
        if (authHeader == null) {
            return false;
        }

        if (authHeader.toLowerCase().includes('bearer')) {
            return true;
        } else {
            return false;
        }
    }

    req.hasValidBearerToken = function() {
        // Check the request headers for an Authorization field
        if (req.hasBearerToken() == false) {
            return false;
        }

        let authHeader = req.getHeaderWithName('Authorization');

        return true;
    }

    
    
    next()
}

module.exports = requestMiddleware;