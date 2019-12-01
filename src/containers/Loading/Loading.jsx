import React, { useEffect, useState } from 'react';
import propertyAPI from '../../api/get-property';

export default function Loading(props) {
  const [search, setSearch] = useState({});

  useEffect(() => {
    const searchFunction = async () => {
      console.log(`Starting Process\nArea: ${props.area}`);
      console.log(JSON.stringify(props.searchParams));
      let propertyUrlsList = await propertyAPI.getPropertyUrls(
        props.area,
        props.searchParams
      );
      console.log(propertyUrlsList);
      propertyUrlsList = JSON.parse(propertyUrlsList);
      const searchId = propertyUrlsList.searchId;
      let propertyObject = {
        searchId: searchId,
        keywords: {}
      };
      for (let i = 0; i < propertyUrlsList.propertyUrls.length; i++) {
        let formBody = {
          searchId: searchId,
          propertyUrl: propertyUrlsList.propertyUrls[i],
          keywords: props.searchParams.keywords
        };
        let propertyReturn = await propertyAPI.getProperty(formBody);
        propertyReturn = JSON.parse(propertyReturn);
        propertyReturn.keywords.forEach(keyword => {
          if (keyword in propertyObject.keywords) {
            propertyObject.keywords[keyword]++;
          } else {
            propertyObject.keywords[keyword] = 1;
          }
        });
        propertyObject[propertyReturn.id] = propertyReturn;
        setSearch(propertyObject);
      }
      console.log(propertyObject);
      console.log(`Search Finished`);
      console.log(search);
      props.finishLoading(search);
    };
    searchFunction();
  }, []);

  return (
    <div>
      <p>{JSON.stringify(search)}</p>
    </div>
  );
}
