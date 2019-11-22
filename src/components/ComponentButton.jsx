import React from 'react';
import Summary from '../containers/Summary'

class ComponentButton extends React.Component {
    constructor(props) {
        super(props);
        const defaultState = props.default ? true : false;
        this.state = { buttonText: props.buttonText, showComponent: defaultState }
    }

    toggleShowState = () => {
        this.setState({showComponent: !this.state.showComponent})
    }

    render() {
        return (
            <div>
                <button onClick={this.toggleShowState}>{this.state.buttonText}</button>
                {this.state.showComponent && this.props.children}
            </div>
        );
    }
}

export default ComponentButton;