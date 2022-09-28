// Componente que renderiza un contador de ToDo pendientes
import React from 'react';
import './ToDoCounter.css';

class ToDoCounter extends React.Component {
    render() {
        return (
            <h3 className="todo-counter">
                <p className="todo-counter-text">
                    You have <span className='todo-counter-number'>{this.props.completed}</span> ToDo's to complete
                </p>
            </h3>
        )
    }
}

export { ToDoCounter };