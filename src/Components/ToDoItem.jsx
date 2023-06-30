// Componente que renderiza un ToDo
// import axios from 'axios';
import React from 'react';
import './ToDoItem.css';

// const API_URL = 'http://localhost:8080/api/todos';


class ToDoItem extends React.Component {
    // Constructor de la clase
    constructor(props) {
        super(props);
        this.state = {
            completed: this.props.todo.completed,
            longPressed: false
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

    // Funciones para poder modificar o eliminar un ToDo con un long click
    handleMouseDown = (e) => {
        let buttonPressTimer = setTimeout(() => { this.handleLongPress(e) }, 1000);
        this.setState({ buttonPressTimer });
    }

    handleMouseUp = (e) => {
        clearTimeout(this.state.buttonPressTimer);
    }

    handleMouseEnter = (e) => {
        this.setState({ longPressed: true });
    }

    handleLongPress = (e) => {
        // console.log("long press");
        this.setState({ longPressed: true });
    }

    handleReleasePress = (e) => {
        // console.log("release press");
        this.setState({ longPressed: false });
    }

    onDelete = (e) => {
        this.props.onDelete(this.props.todo.id);
    }

    onEdit = (e) => {
        // Get the values of the task and description
        let title = document.getElementById(`title${this.props.index}`).innerHTML;
        let description = document.getElementById(`description${this.props.index}`).innerHTML;

        // Send the values to the parent component
        this.props.onEdit(this.props.todo.id, title, description);
        // this.props.onEdit(this.props.todo.id);
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
            // La etiqueta article tiene los eventos para identificar un long click
            <>
                <article
                    className="todo-item"
                    onMouseEnter={this.handleMouseEnter}
                    onTouchStart={this.handleMouseDown}
                    onTouchEnd={this.handleMouseUp}
                    onMouseLeave={this.handleReleasePress}
                    onTouchCancel={this.handleReleasePress}
                >
                    <input type="checkbox" onChange={this.onComplete} id={"checkbox" + this.props.index} />
                    <label htmlFor={"checkbox" + this.props.index}>
                        <div className="todo-item-text">
                            <p className="todo-item-title" id={"title" + this.props.index}>{this.props.todo.task}</p>
                            {/* Descripcion del todo */}
                            <p className="todo-item-description" id={"description" + this.props.index}>{this.props.todo.description}</p>
                        </div>
                    </label>
                    {/* Opciones para el borrado y modificacion del todo dependiendo de si se presiona largo */}
                    {this.state.longPressed &&
                        <div className="todo-item-options">
                            <i className="material-symbols-outlined todo-item-options-delete" onClick={this.onDelete}>
                                delete
                            </i>
                            <i className="material-symbols-outlined todo-item-options-modify" onClick={this.onEdit}>
                                edit
                            </i>
                        </div>}
                </article>
            </>
        )
    }
}

export { ToDoItem };