// Componente que renderiza un ToDo
import axios from 'axios';
import React from 'react';
import './ToDoItem.css';

const API_URL = 'http://localhost:8080/api/todos';


class ToDoItem extends React.Component {
    // Constructor de la clase
    constructor(props) {
        super(props);
        this.state = {
            completed: this.props.todo.completed
        }
    }

    onComplete = (e) => {
        console.log(e.target.checked);
        console.log(this.props.todo.id);

       


        // Seleccionar el titulo y la descripcion del ToDo para tacharlos cuando completed sea true
        let title = document.getElementById(`title${this.props.index}`);
        let description = document.getElementById(`description${this.props.index}`);

        // Si el checkbox esta marcado, tachar el titulo y la descripcion
        if (e.target.checked) {
            title.style.textDecoration = "line-through";
            description.style.textDecoration = "line-through";
        } else {
            title.style.textDecoration = "none";
            description.style.textDecoration = "none";
        }

        this.props.onComplete(this.props.todo.id, e.target.checked);
        
    }

    // Cuando el componente se monta
    componentDidMount() {
        // Seleccionar el titulo y la descripcion del ToDo para tacharlos cuando completed sea true
        let title = document.getElementById(`title${this.props.index}`);
        let description = document.getElementById(`description${this.props.index}`);

        // Cambiar el valor del checkbox html de acuerdo al estado del prop ToDo completed

        if (this.props.todo.completed) {
            document.getElementById(`checkbox${this.props.index}`).checked = true;

            title.style.textDecoration = "line-through";
            description.style.textDecoration = "line-through";
        } else {
            document.getElementById(`checkbox${this.props.index}`).checked = false;
            title.style.textDecoration = "none";
            description.style.textDecoration = "none";
        }

    }


    render() {
        return (
            <article className="todo-item">
                <input type="checkbox" onChange={this.onComplete} id={"checkbox" + this.props.index} />
                <label htmlFor={"checkbox" + this.props.index}>
                    <div className="todo-item-text">
                        <p className="todo-item-title" id={"title" + this.props.index}>{this.props.todo.task}</p>
                        {/* Descripcion del todo */}
                        <p className="todo-item-description" id={"description" + this.props.index}>{this.props.todo.description}</p>
                    </div>
                </label>
            </article>
        )
    }
}

export { ToDoItem };