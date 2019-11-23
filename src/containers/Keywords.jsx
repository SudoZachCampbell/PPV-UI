import React from 'react';
import BarGraph from '../components/BarGraph'

export default class Keywords extends React.Component {
    constructor(props) {
        super(props);
        this.getKeywords = this.getKeywords.bind(this);
    }

    getKeywords = () => {
        return Object.values(this.props.keywords);
    }

    render() {
        return (
            <BarGraph data={this.getKeywords()} />
        );
    }
}