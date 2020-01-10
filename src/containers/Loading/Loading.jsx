import React, { useEffect, useState } from 'react';
import RingLoader from 'react-spinners/RingLoader'
import { css } from "@emotion/core"

import Box from '@material-ui/core/Box'

import propertyAPI from '../../api/ppv-service';
import { Typography } from '@material-ui/core';

export default function Loading(props) {
  const [search, setSearch] = useState({});

  useEffect(() => {
    const searchFunction = async () => {
      if (props.performance) {
        console.log(`Starting Process\nArea: ${props.area}`);
        console.log(JSON.stringify(props.searchParams));
        let property = await propertyAPI.getPropertyUrlsPerformance(
          props.searchParams
        );
        property = JSON.parse(property);
        props.finishLoading(property);
      } else {
        console.log(`Starting Process\nArea: ${props.area}`);
        console.log(JSON.stringify(props.searchParams));
        let propertyUrlsList = await propertyAPI.getPropertyUrls(
          props.area,
          props.searchParams
        );
        propertyUrlsList = JSON.parse(propertyUrlsList);
        const searchId = propertyUrlsList.searchId;
        let propertyObject = {
          searchId: searchId,
          keywords: {},
          searchResult: {}
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
          propertyObject.searchResult[propertyReturn.id] = propertyReturn;
          setSearch({ ...propertyObject });
        }
        props.finishLoading(propertyObject);
      }
    };
    searchFunction();
  }, []);

  return (
    <Box display='flex' flexDirection='column' height='100%' alignItems='center' justifyContent='center'>
      <RingLoader css={css`margin: 30px auto;`} size={100} color={'#9013FE'}></RingLoader>
      <Box>
        <Typography variant='h4' color='#9013FE'>Loading</Typography>
      </Box>
    </Box>
  );
}
