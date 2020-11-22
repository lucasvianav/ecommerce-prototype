import React, {useState, useContext, useEffect} from 'react';
import {Modal} from 'react-bootstrap';

import { DataContext } from '../../../../Context';

import '../../../css/bootstrap.css';
import './index.css'

const ModalPedido = (props) => {
    const context = useContext(DataContext);
    const products = context.data;
    const [estado, setEstado] = useState("");
    
    useEffect( () => {
      setEstado(props.pedido.situation);
    }, [props])

    const salva = (event) =>{
      var nv = {};
      nv.set = true;
      nv.index = props.index;
      nv.new = estado;
      props.onSave(nv);
      props.onHide();
    }
      
    const client = context.accounts.find((cl) => props.pedido.client === cl.email)

    return (
        <Modal className="modal"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='modal-color' closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                <span>Detalhes do Pedido #{props.pedido.id}:</span>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-color justify-content-center">
                <h5>Produtos:</h5>
                <div className="d-flex">
                  {
                    props.pedido.product.map((pr, index) => {
                      
                      var p = {};
                      products.forEach((prod, index) => {
                        if(prod.id === pr.sku.split('-')[1]) {
                          p = prod;
                        }
                      })

                      var ops = '';
                      if(typeof pr.specs !== 'undefined'){
                        ops += (typeof pr.specs.cor !== 'undefined') ? pr.specs.cor : '';
                        ops += ' ';
                        ops += (typeof pr.specs.template !== 'undefined') ? pr.specs.template : '';
                        ops += ' ';
                        ops += (typeof pr.specs.size !== 'undefined') ? pr.specs.size : '';
                        ops += ' ';
                      }
                      return (
                        <div class="card mb-3 mr-3" style={{width: 'calc(50% - 1rem)'}}>
                          <div class="row no-gutters">
                            <div class="col-md-4">
                              <img src={p.img[0].small} className="card-img-top" alt={p.img[0].alt} style={{width: "8rem", marginRight : 'auto', marginLeft : 'auto'}} />
                            </div>
                            <div class="col-md-8">
                              <div class="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p>{ ops }</p>
                                <div className="d-flex justify-content-end">
                                  <span className="badge badge-light">Quantidade: {pr.quantity}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <div>
                  <h5>Dados do Cliente:</h5>
                  {
                    !client ? '' :
                    <div>
                      <p><strong>Nome: </strong>{client.name}</p>
                      <p><strong>Email: </strong>{client.email}</p>
                      <p><strong>Celular: </strong>{client.phoneNumber}</p>
                      <p><strong>CPF: </strong>{client.cpf}</p>
                    </div>
                  }
                </div>
                <h5>Situação: </h5>
                <div id="radiosSituacao">
                  <div className="custom-control custom-radio">
                    <input type="radio" id="situacao1" name="situacao" value="AA"
                    className="custom-control-input" checked={(estado === 'AA')? true : false} onChange={(e)=>{setEstado(e.target.value)}}/>
                    <label className="custom-control-label" for="situacao1">Aguardando Aprovação</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input type="radio" id="situacao2" name="situacao" value="PA"
                    className="custom-control-input" checked={(estado === 'PA')? true : false} onChange={(e)=>{setEstado(e.target.value)}} />
                    <label className="custom-control-label" for="situacao2">Pagamento Aprovado</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input type="radio" id="situacao3" name="situacao" value="PPR"
                    className="custom-control-input" checked={(estado === 'PPR')? true : false} onChange={(e)=>{setEstado(e.target.value)}} />
                    <label className="custom-control-label" for="situacao3">Pronto Para Retirada</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input type="radio" id="situacao4" name="situacao" value="FF"
                    className="custom-control-input" checked={(estado === 'FF')? true : false} onChange={(e)=>{setEstado(e.target.value)}} />
                    <label className="custom-control-label" for="situacao4">Finalizado</label>
                  </div>
                </div>                  
            </Modal.Body>
            <Modal.Footer className='modal-color'>
                <button onClick={(e) => {salva(e)}}
                    className="btn btn-success" style={{width: '20%'}}
                >
                    Salvar
                </button>
                <button onClick={props.onHide} className="btn btn-secondary" style={{width: '20%'}}>Fechar</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalPedido;