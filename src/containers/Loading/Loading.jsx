import React, { useEffect, useState } from 'react';
import propertyAPI from '../../api/get-property';

export default function Loading(props) {
  const [search, setSearch] = useState({});

  useEffect(() => {
    console.log(`Starting Process`);
    propertyAPI
      .getPropertyUrls(props.area, props.searchParams)
      .then(propertyUrlsList => {
        propertyUrlsList = JSON.parse(propertyUrlsList);
        const searchId = propertyUrlsList.searchId;
        let propertyObject = {
          searchId: searchId,
          keywords: {}
        };
        for (let i = 0; i < propertyUrlsList.propertyUrls.length; i++) {
          console.log(`Iterant ${i}`);
          let formBody = {
            searchId: searchId,
            propertyUrl: propertyUrlsList.propertyUrls[i],
            keywords: props.searchParams.keywords
          };
          let propertyReturn = propertyAPI.getProperty(formBody);
          propertyReturn = JSON.parse(propertyReturn);
          propertyReturn.keywords.forEach(keyword => {
            if (keyword in propertyObject.keywords) {
              propertyObject.keywords[keyword]++;
            } else {
              propertyObject.keywords[keyword] = 1;
            }
          });
          propertyObject[propertyReturn.id] = propertyReturn;
          setSearch({ propertySearch: propertyObject });
        }
        props.finishLoading(search);
      });
  }, []);

  return (
    <div>
      <p>{JSON.stringify(search)}</p>
    </div>
  );
}
