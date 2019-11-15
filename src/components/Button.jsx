import React from 'react';
import Property from '../api/get-property';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = { buttonText: props.text }
        this.getProperty = this.getProperty.bind(this);
    }

    async getProperty() {

        //TODO
        console.log("Starting");
        let propertyBody = await Property.getProperty();
        this.setState({ property: propertyBody});
    }

    render() {
        return (
            <div>
                <button onClick={this.getProperty}>{this.state.buttonText}</button>
                {(this.state.property) ? <div>{this.state.property}</div> : <div>No</div>}
            </div>
        );
    }
}

export default Button;