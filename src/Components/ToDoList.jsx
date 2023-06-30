// Componente que renderiza una lista de ToDo
import React from 'react';
import { ToDoItem } from './ToDoItem';
import './ToDoList.css';

class ToDoList extends React.Component {

    render() {
        return (
            <main className="todo-list">
                {this.props.todos.map((todo, index) => {
                    return (
                        <div
                            className='todo-items'
                            key={index} >
                            <ToDoItem
                                key={index}
                                todo={todo}
                                onComplete={this.props.onComplete}
                                onDelete={this.props.onDelete}
                                onEdit={this.props.onEdit}
                                index={index} />
                        </div>
                    )
                }
                )}
            </main>
        )
    }
}

export { ToDoList };