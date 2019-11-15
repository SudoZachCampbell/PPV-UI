import React from 'react';
import BarGraph from '../components/BarGraph'
import keywordCount from '../__mock__/keyword-count'

export default class Keywords extends React.Component {
    constructor(props) {
        super(props);
    }

    getKeywords() {
        return Object.values(keywordCount);
    }

    render() {
        return (
            <BarGraph data={this.getKeywords()} />
        );
    }
}