// Componente que renderiza una lista de ToDo
import React from 'react';
import { ToDoItem } from './ToDoItem';
import './ToDoList.css';

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            longPressed: false
        }
    }

    // displayOptions = (id) => {
    //     this.props.displayOptions(id);
    //     return true;
    // }
    // onLongPress = (longPressed) => {
    //     this.setState({ longPressed });
    // }

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
                                onLongPress={this.onLongPress}
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

    // onDelete = (e) => {
    //     debugger;
    //     this.props.onDelete(e.target.value);
    //     console.log(e.target.value);
    // }

}

export { ToDoList };