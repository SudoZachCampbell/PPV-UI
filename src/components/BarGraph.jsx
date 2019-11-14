import React from 'react';

class BarGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rankings: props.ranks }
    }

    render() {
        return (
            <div></div>
        );
    }
};

export default BarGraph;