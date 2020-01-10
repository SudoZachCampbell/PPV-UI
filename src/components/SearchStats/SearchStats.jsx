import React, {useState, useEffect} from 'react';

import BarGraph from '../BarGraph/BarGraph' 
import { Typography } from '@material-ui/core';

export default function SearchStats(props) {
    const [keywords, setKeywords] = useState({});


      useEffect(() => {

      }, [props.result]);

    return(
        <div>
            <BarGraph data={props.result.keywords} x='keyword' y='count'/>
        </div>
    )
}