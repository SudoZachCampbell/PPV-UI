import React from 'react';
import propertyAPI from '../api/get-property';

class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    async search() {
        const area = 'banbridge';
        const propertyUrls = await propertyAPI.getPropertyUrls(area);
        propertyUrls.propertyUrls.forEach()
    }

    render() {
        return(
            <div></div>
        );
    }
}