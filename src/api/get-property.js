import request from 'request'

export default {
    getPropertyUrls: (area) => {
        return new Promise((resolve, reject) => {
            request.get(`http://localhost:8080/property/${area}`, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        });
    },

    getProperty: (formBody) => {
        return new Promise((resolve, reject) => {
            request.post("http://localhost:8080/property", {form: formBody}, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        });
    }
}