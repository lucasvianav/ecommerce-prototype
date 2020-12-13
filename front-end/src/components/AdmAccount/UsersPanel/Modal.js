import React, {useState, useContext, useEffect} from 'react';
import {Modal} from 'react-bootstrap';

import '../../css/bootstrap.css';

import { DataContext } from '../../../Context';

const ModalUser = (props) => {

    const context = useContext(DataContext);
    const getCurrentAccount = context.getCurrentAccount;
    const [conta, setConta] = useState();

    useEffect(() => {
        var ct = getCurrentAccount();
        setConta(ct);
    }
    ,[])


    const salva = (event) =>{
        var nv = {};
        nv.set = true;
        nv.index = props.index;
        nv.id = props.value.id;
        nv.data = {
            type: "adimin"
        }
        nv.send = "put";
        props.onSave(nv);
        props.onHide();
    }

    const exclui = (event) =>{
        var contaAtual = (conta.email === props.value.email) ? true : false;
        console.log(conta);
        console.log(contaAtual);

        if(window.confirm('O produto não poderá ser recuperado. Você tem certeza que deseja excluí-lo?')){
            var nv = {};
            nv.set = true;
            nv.index = props.index;
            nv.email = props.value.email;
            nv.send = "del";
            nv.contaAtual = contaAtual;
            props.onSave(nv);
            props.onHide();

        }
    }

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
                <button onClick={exclui} className="big-btn void-btn" style={{width: '20%'}}>Excluir</button>
                {
                    (props.value.type === "admin") ? '' :
                    <button onClick={(e) => {salva(e)}} className="big-btn void-btn" style={{maxWidth: '210px'}}>
                        Tornar Adiministrador
                    </button>
                }
            </Modal.Footer>
        </Modal>
    );
}

export default ModalUser;