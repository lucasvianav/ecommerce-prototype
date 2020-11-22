import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';

import '../../css/bootstrap.css';

const ModalImg = (props) => {

    const [newAlt, setNewAlt] = useState("");

    useEffect( () => {
        setNewAlt(props.alt);
    }, [props.alt])

    const salva = (event) =>{
        var nv = {};
        nv.set = true;
        nv.index = props.index;
        nv.new = newAlt;
        props.onSave(nv);
        props.onHide();
    }

    return (
        <Modal className="modal"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='dark-bg' closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Detalhes da Imagem:
            </Modal.Title>
            </Modal.Header>
            <Modal.Body className="justify-content-center dark-bg">
                <div className="d-flex justify-content-center">
                    <img src={props.src} alt={props.alt} style={{width: '50%'}} className="shadow rounded"/>
                </div>
                <div className="mt-2" style={{width: '100%'}}>
                    <form style={{width: '100%'}}>
                        <label for="descricaoImg">Descrição da Imagem: *</label>
                        <input id="descricaoImg" type="text" className="form-control" 
                            placeholder="Digite a Descrição da Imagem"
                            onChange={(event) => {setNewAlt(event.target.value);}}
                            value={newAlt}
                        />
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer className='dark-bg'>
                <button onClick={(e) => {salva(e)}}
                    className="btn btn-success" style={{width: '20%'}}
                >
                    Salvar
                </button>
                <button onClick={props.onHide} className="btn btn-danger" style={{width: '20%'}}>Cancelar</button>
            </Modal.Footer>
        </Modal>
    );
}

const ModalInfo = (props) => {

    return (
        <Modal className="modal"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='dark-bg' closeButton>
            </Modal.Header>
            <Modal.Body className="justify-content-center dark-bg">
                {props.children}
            </Modal.Body>
            <Modal.Footer className='dark-bg'>
                <button onClick={props.onHide} className="btn btn-secondary" style={{width: '20%'}}>Entendi</button>
            </Modal.Footer>
        </Modal>
    );
}

const output = {ModalImg, ModalInfo}

export default output