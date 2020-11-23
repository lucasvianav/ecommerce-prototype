import React, {useContext, useState, useEffect} from 'react';
import $ from 'jquery';

import ModalPedido from './ModalPedido';

import { DataContext } from '../../Context';

import './index.css';
import '../css/bootstrap.css';

const OrdersPanel = (props) => {
  const context = useContext(DataContext);
  const [orders, setOrders] = useState( props.type === 'admin' ? context.orders : context.orders.filter(item => item.client === context.isLogged.email));
  const products = context.data;

  const [modalPedido, setModalPedido] = useState(false);
  const [propsModal, setPropsModal] = useState({pedido: {product: [], situation: []}});

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
      var ord = (props.type === 'admin') ? context.orders : context.orders.filter(item => item.client === context.isLogged.email)
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
        if(it.id === id){ 
          info.pedido = it;
          info.index = index;
        }
      })

      setPropsModal(info);
      setModalPedido(true);
    }

    return(
        <div className="card p-0" key={item.date + item.id + index}>
          <div className="card-body m-0 p-2">
            <h5 className="card-title">Pedido #{item.id}</h5>
            <h6>Valor total: R${item.total}</h6>
            <h6>Data: {item.date + ' - ' + item.time}</h6>
            <ul className='bullet-list'>
              {
                item.product.map((pr, index) => {

                  var nomePr = '';
                  products.forEach((p, index) => {
                    if(p.id === pr.sku.split('-')[1]) {
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
                  onClick={(e) => {callModal(item.id)}}
                >Mais Detalhes</button>
            </div>
          </div>
      </div>
    );
    
  }

  return(
    <section className='OrdersPanel'>
    <div>
        <div id="vazioOrder" className="d-flex justify-content-center" style={{height: "60px"}}> 
            <h4>Não há nada aqui!</h4>
        </div>
        <div className="card-columns">
            {orders.map(renderProduct)}
        </div>
    </div>
    <ModalPedido
        type={props.type}
        show={modalPedido}
        {...propsModal}
        onSave = {(e) => {
          if (e.set === true) {
            var vet = orders;
            vet[e.index].situation = e.new;
            setOrders(vet);
        }}}
        onHide={() => {setModalPedido(false)}}
      />
    </section>
  );
}

export default OrdersPanel;