// Componente que renderiza un contador de ToDo pendientes
import React from 'react';
import './ToDoCounter.css';

class ToDoCounter extends React.Component {
    render() {
        return (
            <h3 className="todo-counter">
                <span className="todo-counter-text"> You have {this.props.completed} TODOs to complete </span>
            </h3>
        )
    }
}

export { ToDoCounter };