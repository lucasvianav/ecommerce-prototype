import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';

import '../../css/bootstrap.css';

const ModalCoupon = (props) => {

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
                Cupom:
            </Modal.Title>
            </Modal.Header>
            <Modal.Body className="justify-content-center dark-bg">
                <div className="row">
                    <div className="col-md-5">
                        <label for="couponSrc" >Texto de Cupon:</label>
                        <input type="text" className="form-control input-control" id="couponSrc" placeholder="Exemplo10"/>
                    </div>
                    <div className="col-md-3">
                        <label for="coupontype" >Tipo do Cupon:</label>
                        <select name="coupontype" id="coupontype" className="custom-select">
                            <option value="" selected disabled={true}>Selecione</option>
                            <option value="percentage">Porcentagem</option>
                            <option value="absolute">Valor cheio</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label for="couponSrc" >Valor:</label>
                        <input type="number" className="form-control input-control" id="couponSrc" placeholder="10"/>
                    </div>
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

export default ModalCoupon;