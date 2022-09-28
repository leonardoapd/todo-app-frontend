// Componente que renderiza un modal para crear un nuevo ToDo
import React from 'react';
import './CreateToDoModal.css';

class CreateToDoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: '',
            description: '',
            errors: {
                taskField: false,
                descriptionField: false
            }
        }
    }
    // Metodo que se ejecuta cuando el usuario escribe en el input de texto
    onChangeText = (e) => {
        this.setState({
            task: e.target.value
        })
    }
    // Metodo que se ejecuta cuando el usuario escribe en el input de descripcion
    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    // Metodo para validar los campos del modal y crear un nuevo ToDo
    validateForm = (e) => {

        e.preventDefault();
        console.log(this.state.task);
        if (this.state.task === '') {
            this.setState({
                errors: {
                    taskField: true, descriptionField: false
                }
            });
        }
        if (this.state.description === '') {
            this.setState({
                errors: {
                    descriptionField: true, taskField: false
                }
            });
        }
        if (this.state.task === '' && this.state.description === '') {
            this.setState({
                errors: {
                    descriptionField: true, taskField: true
                }
            });
        }
        console.log(this.state);
        if (this.state.task !== '' && this.state.description !== '') {
            this.onCreate();
        }


    }

    // Metodo que se ejecuta cuando el usuario presiona el boton de crear ToDo
    onCreate = () => {
        this.props.onCreate(this.state.task, this.state.description);
        this.setState({
            task: '',
            description: '',
            errors: {
                taskField: false,
                descriptionField: false
            }
        })
        this.closeModal();
    }
    // Metodo que se ejecuta cuando el usuario presiona el boton de cerrar el modal
    closeModal = () => {
        const modal = document.getElementById('modal');
        modal.close();
        this.setState({
            errors: {
                taskField: false,
                descriptionField: false
            }
        })
    }

    enterPressed = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            this.onCreate();
        }
    }

    render() {
        return (
            // <React.Fragment>
            //     {this.props.show && (
            <dialog className="modal" id="modal" onKeyDown={this.enterPressed}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Create ToDo</h2>
                        <i className="material-symbols-outlined modal-close" id="close-modal" onClick={this.closeModal}>
                            cancel
                        </i>
                    </div>
                    <form className="modal-body" onSubmit={this.validateForm}>
                        <div className="modal-body-input">
                            <label htmlFor="task">ToDo: </label>
                            <input type="text" id="task" onChange={this.onChangeText} value={this.state.task} />
                        </div>
                        {this.state.errors.taskField && <p className="error">Please fill the task field</p>}
                        <div className="modal-body-input">
                            <label htmlFor="description">Description: </label>
                            <input type="text" id="description" onChange={this.onChangeDescription} value={this.state.description} />
                        </div>
                        {this.state.errors.descriptionField && <p className="error">Please fill the description field</p>}
                        <div className="modal-footer d-flex">
                            <button className="btn create-btn" type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </dialog>
            //     )}
            // </React.Fragment>
        )
    }
}

export { CreateToDoModal };