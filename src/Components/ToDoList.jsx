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
                        <ToDoItem key={index} todo={todo} onComplete={this.props.onComplete} index={index}/>
                    )
                }
                )}
            </main>
        )
    }

    // onDelete = (e) => {
    //     debugger;
    //     this.props.onDelete(e.target.value);
    //     console.log(e.target.value);
    // }

}

export { ToDoList };