import request from 'request'

export default {
    getLLByArea: (area) => {
        return new Promise((resolve, reject) => {
            request.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${area}&key=AIzaSyCQLI34B1kJnIeAFKrcbzzJfqhwcfLBCK8`, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }
}