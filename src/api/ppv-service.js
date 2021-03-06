import request from 'request';

export default {
  getPropertyUrls: (area, formBody) => {
    return new Promise((resolve, reject) => {
      console.log(`Getting Urls for ${area}`);
      request.post(
        {
          url: `http://localhost:8080/property/filtered`,
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(formBody)
        },
        (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        }
      );
    });
  },

  getPropertyUrlsPerformance: formBody => {
    return new Promise((resolve, reject) => {
      request.post(
        {
          url: `http://localhost:8080/property/filtered/true`,
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(formBody)
        },
        (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        }
      );
    });
  },

  getProperty: formBody => {
    return new Promise((resolve, reject) => {
      console.log(`Getting Property ${formBody.propertyUrl}`);
      request.post(
        {
          url: 'http://localhost:8080/property',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(formBody)
        },
        (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        }
      );
    });
  },

  getPropertyCount: formBody => {
    return new Promise((resolve, reject) => {
      request.post(
        {
          url: 'http://localhost:8080/property/count',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(formBody)
        },
        (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        }
      );
    });
  },

  
  getAreaTerm: area => {
    return new Promise((resolve, reject) => {
      request.get(
        {
          url: `http://localhost:8080/property/term/${area}`
        },
        (error, response, body) => {
          resolve(JSON.parse(body));
        }
      );
    });
  },

  getCrimeData: formBody => {
    return new Promise((resolve, reject) => {
      request.post(
        {
          url: 'http://localhost:8080/open/crime',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(formBody)
        },
        (error, response, body) => {
          resolve(JSON.parse(body));
        }
      );
    });
  }
};
