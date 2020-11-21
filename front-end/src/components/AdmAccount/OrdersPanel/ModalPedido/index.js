import React, {useState, useContext, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import $ from 'jquery';

import { DataContext } from '../../../../Context';

import '../../../css/bootstrap.css';

const ModalPedido = (props) => {
    const context = useContext(DataContext);
    const products = context.data;
    const clients = context.accounts;
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
                <div>
                  <h5>Dados do Cliente:</h5>
                  <div>
                    {clients.map((client, index) => {
                      var end = (props.pedido.adress !== '') ? "Endereço: " : '';
                      var endereco = (props.pedido.adress !== '') ? props.pedido.adress : '';
                      if (client.email === props.pedido.client){
                        return(
                          <>
                            <p><strong>Nome: </strong>{client.name}</p>
                            <p><strong>{end}</strong>{endereco}</p>
                          </>
                        )
                      }
                    })}
                  </div>
                </div>
                <h5>Situação: </h5>
                <div id="radiosSituacao">
                  <div className="custom-control custom-radio">
                    <input type="radio" id="situacao1" name="situacao" value="AA"
                    className="custom-control-input" checked={(estado === 'AA')? true : false} onChange={(e)=>{setEstado(e.target.value)}}/>
                    <label className="custom-control-label" for="situacao1">Aguardando Aprovação</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input type="radio" id="situacao2" name="situacao" value="AE"
                    className="custom-control-input" checked={(estado === 'AE')? true : false} onChange={(e)=>{setEstado(e.target.value)}} />
                    <label className="custom-control-label" for="situacao2">Aguardando Envio</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input type="radio" id="situacao3" name="situacao" value="AC"
                    className="custom-control-input" checked={(estado === 'AC')? true : false} onChange={(e)=>{setEstado(e.target.value)}} />
                    <label className="custom-control-label" for="situacao3">Aguardando Chegada</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input type="radio" id="situacao4" name="situacao" value="FF"
                    className="custom-control-input" checked={(estado === 'FF')? true : false} onChange={(e)=>{setEstado(e.target.value)}} />
                    <label className="custom-control-label" for="situacao4">Finalizado</label>
                  </div>
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