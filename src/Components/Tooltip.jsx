// Componente que recrea un tooltip
import React from 'react';
import './Tooltip.css';

class Tooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="tooltip">
                <span className="tooltiptext">{this.props.text}</span>
            </div>
        )
    }
}

export { Tooltip };
