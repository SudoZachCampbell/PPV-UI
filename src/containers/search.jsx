import React from 'react';
import propertyAPI from '../api/get-property';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const area = 'banbridge';
        const keywords = ['bathroom', 'kitchen', 'garden',];
        let propertyUrls = await propertyAPI.getPropertyUrls(area);
        propertyUrls = JSON.parse(propertyUrls);
        const searchId = propertyUrls.searchId;
        let propertyObject = {
            searchId: searchId
        }
        propertyUrls.propertyUrls.reduce(async (accum, url) => {
            let propertyReturn = await this.getProperty(searchId, url, keywords);
            propertyObject[propertyReturn.id] = propertyReturn;
        }, propertyObject)
    }

    async getProperty(searchId, url, keywords) {
        let formBody = {
            keywords: keywords,
            searchId: searchId,
            propertyUrl: url
        }
        return await propertyAPI.getProperty(formBody);
    }

    render() {
        return (
            <div>
                Yes
            </div>
        );
    }
}