import React, {useState, useContext, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import $ from 'jquery';

import { DataContext } from '../../../../Context';

import '../../../css/bootstrap.css';

const ModalPedido = (props) => {
    const context = useContext(DataContext);
    const products = context.data;
    const clients = context.accounts;
    const [alteracao, setAlteracao] = useState("");

    const salva = (event) =>{
        var nv = {};
        nv.set = true;
        nv.index = props.index;
        nv.new = '';
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
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Detalhes do Pedido #{props.pedido.id}:
            </Modal.Title>
            </Modal.Header>
            <Modal.Body className="justify-content-center">
                <h5>Produtos:</h5>
                <div className="d-flex">
                  {
                    props.pedido.product.map((pr, index) => {
                      
                      var p = {};
                      products.forEach((prod, index) => {
                        if(prod.id === pr.id) {
                          p = prod;
                        }
                      })

                      var ops = '';
                      if(typeof pr.options !== 'undefined'){
                        ops += (typeof pr.options.cor !== 'undefined') ? pr.options.cor : '';
                        ops += ' ';
                        ops += (typeof pr.options.template !== 'undefined') ? pr.options.template : '';
                        ops += ' ';
                        ops += (typeof pr.options.size !== 'undefined') ? pr.options.size : '';
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
            </Modal.Body>
            <Modal.Footer>
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