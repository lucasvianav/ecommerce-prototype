import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import $ from 'jquery';

import '../../css/bootstrap.css';

const ModalCoupon = (props) => {

    const [str, setStr] = useState("");
    const [type, setType] = useState("");
    const [discount, setDiscount] = useState(0);

    useEffect( () => {
        setStr(props.value.str);
        setType(props.value.type);
        setDiscount(props.value.discount);
    }, [props])

    const salva = (event) =>{
      var flag = true;
      if(str === ""){ 
        $('#couponstr').addClass('is-invalid');
        flag = false;
      }
      if(type === ""){ 
        $('#coupontype').addClass('is-invalid');
        flag = false;
      }
      if(discount === 0){
        $('#coupondiscount').addClass('is-invalid');
        flag = false;
      }

      if(flag){
        var nv = {};
        nv.set = true;
        nv.index = props.index;
        nv.id = props.value.id;
        nv.data = {
          str: str,
          type: type,
          discount: discount
        }
        nv.send = (props.type === "create") ? "post" : "put";
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
            <Modal.Title id="contained-modal-title-vcenter">
                {(props.type === "create") ? "Novo Cumpom" : "Alterar Cupom"}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body className="justify-content-center dark-bg">
                <div className="row">
                    <div className="col-md-5">
                        <label htmlFor="couponstr" >Texto do Cupon:</label>
                        <input type="text" className="form-control input-control" id="couponstr" placeholder="Exemplo10" 
                          value={str} onChange={(e)=>{setStr(e.target.value)}}/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="coupontype" >Tipo do Cupon:</label>
                        <select name="coupontype" id="coupontype" className="custom-select"
                          value={type} onChange={(e)=>{setType(e.target.value)}}>
                            <option value="" disabled={true}>Selecione</option>
                            <option value="percentage">Porcentagem</option>
                            <option value="absolute">Valor cheio</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="coupondiscount" >Valor:</label>
                        <input type="number" className="form-control input-control" id="coupondiscount" placeholder="10"
                          value={discount} onChange={(e)=>{setDiscount(e.target.value)}}/>
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