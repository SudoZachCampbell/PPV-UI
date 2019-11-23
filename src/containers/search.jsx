import React from 'react';
import propertyAPI from '../api/get-property';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {propertySearch: {}}
    }

    async componentDidMount() {
        const keywords = ['bathroom', 'kitchen', 'garden',];
        let propertyUrlsList = await propertyAPI.getPropertyUrls(this.props.area);
        propertyUrlsList = JSON.parse(propertyUrlsList);
        const searchId = propertyUrlsList.searchId;
        let propertyObject = {
            searchId: searchId,
            keywords: {}
        }
        propertyUrlsList.propertyUrls.reduce(async (accum, url) => {
            let propertyReturn = await this.getProperty(searchId, url, keywords);
            propertyReturn = JSON.parse(propertyReturn);
            propertyReturn.keywords.forEach(keyword => {
                if(keyword in propertyObject.keywords) {
                    propertyObject.keywords[keyword]++
                } else {
                    propertyObject.keywords[keyword] = 1
                }
            })
            propertyObject[propertyReturn.id] = propertyReturn;
            this.setState({propertySearch: propertyObject});
        }, propertyObject)
        this.props.callback(propertyObject);
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
                Search: {JSON.stringify(this.state.propertySearch)}
            </div>
        );
    }
}