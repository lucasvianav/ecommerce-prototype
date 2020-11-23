import React, {useState, useContext, useEffect} from 'react';
import {Modal} from 'react-bootstrap';

import { DataContext } from '../../../Context';

import '../../css/bootstrap.css';
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
                <div className="product-cards d-flex">
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
                        <div className="card mb-3 mr-3" style={{width: 'calc(50% - 1rem)'}} key={pr.name + pr.sku + index}>
                          <div className="row no-gutters">
                            <div className="col-md-4">
                              <img src={p.img[0].small} className="card-img-top" alt={p.img[0].alt} style={{width: "8rem", marginRight : 'auto', marginLeft : 'auto'}} />
                            </div>
                            <div className="col-md-8">
                              <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p>{ ops }</p>
                                <div className="d-flex justify-content-end">
                                  <span className="badge badge-light mr-1">Preço: {pr.price}</span>
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

                <div className='info-data'>
                  {
                    props.type !== 'admin' ? '' :
                    <div className='client'>
                      <h5>Dados do cliente:</h5>
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
                  }

                  <div className={'order-' + props.type}>
                    <h5>Dados do pedido:</h5>
                    <p><strong>Data: </strong>{props.pedido.date}</p>
                    <p><strong>Horário: </strong>{props.pedido.time}</p>
                    <div className='payment'><p title={props.pedido.payment}><strong>Forma de pagamento: </strong>{props.pedido.payment}</p></div>
                    {
                      !parseFloat(props.pedido.discount) > 0 ? '' :
                      <>
                        <p><strong>Subtotal: </strong>R${(parseFloat(props.pedido.total) + parseFloat(props.pedido.discount)).toFixed(2).replaceAll('.',',')}</p>
                        <p><strong>Desconto: </strong>R${parseFloat(props.pedido.discount).toFixed(2).replaceAll('.',',')}</p>
                      </>
                    }
                    <p className='total'><strong>Total: </strong>R${parseFloat(props.pedido.total).toFixed(2).replaceAll('.',',')}</p>
                  </div>
                </div>

              {
                props.type !== 'admin' ? '' :
                <div className='situations'>
                  <h5>Situação: </h5>
                  <div id="radiosSituacao">
                    <div className="custom-control custom-radio">
                      <input type="radio" id="situacao1" name="situacao" value="AA"
                      className="custom-control-input" checked={(estado === 'AA')? true : false} onChange={(e)=>{setEstado(e.target.value)}}/>
                      <label className="custom-control-label" htmlFor="situacao1">Aguardando Aprovação</label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input type="radio" id="situacao2" name="situacao" value="PA"
                      className="custom-control-input" checked={(estado === 'PA')? true : false} onChange={(e)=>{setEstado(e.target.value)}} />
                      <label className="custom-control-label" htmlFor="situacao2">Pagamento Aprovado</label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input type="radio" id="situacao3" name="situacao" value="PPR"
                      className="custom-control-input" checked={(estado === 'PPR')? true : false} onChange={(e)=>{setEstado(e.target.value)}} />
                      <label className="custom-control-label" htmlFor="situacao3">Pronto Para Retirada</label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input type="radio" id="situacao4" name="situacao" value="FF"
                      className="custom-control-input" checked={(estado === 'FF')? true : false} onChange={(e)=>{setEstado(e.target.value)}} />
                      <label className="custom-control-label" htmlFor="situacao4">Finalizado</label>
                    </div>
                  </div>
                </div>
              }

            </Modal.Body>
            {
              props.type !== 'admin' ? '' :
              <Modal.Footer className='modal-color'>
                  <button onClick={(e) => {salva(e)}}
                      className="btn btn-success" style={{width: '20%'}}
                  >
                      Salvar
                  </button>
                  <button onClick={props.onHide} className="btn btn-secondary" style={{width: '20%'}}>Fechar</button>
              </Modal.Footer>
            }
        </Modal>
    );
}

export default ModalPedido;