import React, {useContext, useState, useEffect} from 'react';
import $ from 'jquery';

import ModalPedido from './ModalPedido';

import { DataContext } from '../../Context';

import './index.css';
import '../css/bootstrap.css';
import { Async } from 'react-async';
import { Spinner } from 'react-bootstrap';

const OrdersPanel = (props) => {
  const context = useContext(DataContext);
  const [orders, setOrders] = useState(context.orders)
  const products = context.data;

  const [modalPedido, setModalPedido] = useState(false);
  const [propsModal, setPropsModal] = useState({pedido: {products: [], situation: [], status: [], client: []}});

  const allOrders = context.orders;

  useEffect( () => {
    if(orders.length === 0){ 
      $("#vazioOrder").removeClass("d-none");
      $("#vazioOrder").addClass("d-flex");
    }else{
      $("#vazioOrder").addClass("d-none");
      $("#vazioOrder").removeClass("d-flex");
    }
  }, [orders])

  useEffect( () => {
    var d = [], flag = 0;
    const filters = (typeof props.filter !== "undefined") ? props.filter : [];
    if(filters.length > 0){
      allOrders.forEach((item, index) => {
        filters.forEach((fil, index)=>{
          if(fil.data.length > 0){
            if(fil.data.indexOf(item[fil.title]) + 1){
              d.push(item);
            }else{
              if(d.indexOf(item) >= 0)
                d.splice(d.indexOf(item), 1);
            }
            flag = 1;
          }
        })
      })
    }
    if(flag === 1){
      setOrders(d);
    }else{
      var ord = context.orders
      setOrders(ord);
    }
  }, [props, allOrders])

  const renderProduct  = (item, index) => {
      const defSt = {
                      AA: "Aguardando Aprovação", 
                      PA: "Pagamento Aprovado", 
                      PPR: "Pronto Para Retirada", 
                      FF: "Finalizado"
                    }
      const st = defSt[item.situation];

      const callModal = (id) => {
        var info = {};
        info.pedido = {};

        orders.forEach((it, index)=>{
          if(it._id === id){ 
            info.pedido = it
            info.pedido.status = st
            info.pedido.client = it.client
            info.index = index
          }
        })

        setPropsModal(info);
        setModalPedido(true);
      }

      return(
          <div className="card p-0" key={item.date + item._id + index}>
            <div className="card-body m-0 p-2">
              <h5 className="card-title">Pedido #{item._id}</h5>
              <h6>Valor total: R${item.total}</h6>
              <h6>Data: {item.date + ' - ' + item.time}</h6>
              <ul className='bullet-list'>
                {
                  item.products.map((pr, index) => {

                    var nomePr = '';
                    products.forEach((p, index) => {
                      if(p._id === pr.sku.split('-')[1]) {
                        nomePr = p.name;
                      }
                    })

                    return(
                        <li key={pr.name + pr.sku + pr.index}>
                          <span className='product-title'>{nomePr + ' '} </span>
                          {props.type === 'admin' ? <span>({pr.sku})<br/></span> : ''}
                          <span>{pr.quantity} item(s)</span> {props.type === 'admin' ? <span>* R${parseInt(pr.price).toFixed(2).replaceAll('.',',')} = R${(parseInt(pr.quantity) * parseFloat(pr.price)).toFixed(2).replaceAll('.',',')}</span> : ''}
                        </li>
                    )
                  })
                }
              </ul>
              <span className={"badge badge-light st-" + item.situation}>{st}</span>
              <div className="d-flex justify-content-end">
                  <button className="btn text-btn green" 
                    onClick={(e) => {callModal(item._id)}}
                  >Mais Detalhes</button>
              </div>
            </div>
        </div>
      )
  }

  return(
    <Async promiseFn={context.fetchOrders}>
      {({ response, error, isPending }) => {
        return (isPending) 
        ? 
          <section className='OrdersPanel'>
            <Spinner animation="border" role="status" variant={context.darkTheme ? 'light' : 'dark'} className='d-flex justify-content-center' style={{'margin': 'auto'}}>
              <span className="sr-only">Carregando...</span>
            </Spinner>
          </section>
        :
          <section className='OrdersPanel'>
            <div>
                <div id="vazioOrder" className="d-flex justify-content-center" style={{height: "60px", margin: 'auto'}}> 
                    <h4 className='grey'>Não há nada aqui!</h4>
                </div>
                <div className="card-columns">
                    {orders.map(renderProduct)}
                </div>
            </div>
           <ModalPedido
              type={props.type}
              show={modalPedido}
              {...propsModal}
              onSave = {async e => {
                if (e.set === true) {
                  const {_id} = orders[e.index]
                  const situation = e.new
                  await context.updateOrder(_id, situation)

                  let vet = orders;
                  vet[e.index].situation = e.new;
                  setOrders(vet)
              }}}
              onHide={() => {setModalPedido(false)}}
            />
          </section>
      }}
    </Async>
  )
}

export default OrdersPanel;