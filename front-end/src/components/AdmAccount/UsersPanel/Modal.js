import React, {useState, useContext, useEffect} from 'react';
import {Modal} from 'react-bootstrap';

import '../../css/bootstrap.css';

import { DataContext } from '../../../Context';

const ModalUser = (props) => {

    const context = useContext(DataContext);

    return (
        <Modal className="modal"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='dark-bg' closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className='section-title'>
                Usuário: {props.value.name}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body className="justify-content-center dark-bg">
                <div>
                    <p>
                        <strong>Nome: </strong>
                        {props.value.name}
                    </p>
                    <p>
                        <strong>CPF: </strong>
                        {props.value.cpf}
                    </p>
                    <p>
                        <strong>Tipo: </strong>
                        {props.value.type}
                    </p>
                    <p>
                        <strong>Email: </strong>
                        {props.value.email}
                    </p>
                    <p>
                        <strong>Telefone: </strong>
                        {props.value.cpf}
                    </p>
                    <p>
                        <strong>Data de Nascimento: </strong>
                        {props.value.birthday}
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer className='dark-bg'>
                <button onClick={async () => { if(window.confirm('Você tem certeza? Essa ação não poderá ser desfeita.')){ await context.deleteAccount(props.value._id); props.onHide() } }} className="big-btn void-btn" style={{width: '20%'}}>Excluir</button>
                {
                    (props.value.type === "admin")
                    ? 
                    <button onClick={async () => { if(window.confirm('Você tem certeza?')){ await context.changeAccountType(props.value._id, 'client'); props.onHide() }}} className="big-btn void-btn" style={{maxWidth: '210px'}}>
                        Tornar Cliente
                    </button>
                    :
                    <button onClick={async () => { if(window.confirm('Você tem certeza?')){ await context.changeAccountType(props.value._id, 'admin'); props.onHide() }}} className="big-btn void-btn" style={{maxWidth: '210px'}}>
                        Tornar Adiministrador
                    </button>
                }
            </Modal.Footer>
        </Modal>
    );
}

export default ModalUser;