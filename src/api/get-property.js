import request from 'request'

export default {
    getProperty: () => {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:8080/property/lisburn", (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        });
    }
}