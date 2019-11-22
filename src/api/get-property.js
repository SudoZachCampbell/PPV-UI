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
            request.post({
                url: 'http://localhost:8080/property',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(formBody)
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        });
    }
}