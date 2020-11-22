import React, {useContext, useState} from 'react';

import ModalPedido from './ModalPedido';

import { DataContext } from '../../../Context';

import './index.css';
import '../../css/bootstrap.css';

const OrdersPanel = (props) => {
  const context = useContext(DataContext);
  const [orders, setOrders] = useState(context.orders);
  const products = context.data;

  const [modalPedido, setModalPedido] = useState(false);
  const [propsModal, setPropsModal] = useState({pedido: {product: [], situation: []}});

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
                <h6>Data: {item.date}</h6>
                <ul>
                  {
                    item.product.map((pr, index) => {

                      var nomePr = '';
                      products.forEach((p, index) => {
                        if(p.id === pr.sku.split('-')[1]) {
                          nomePr = p.name;
                        }
                      })

                      return(
                          <li>
                            {nomePr + ' '} 
                            ({pr.sku}) <br />
                            {pr.quantity} item(s)
                          </li>
                      )
                    })
                  }
                </ul>
                <span className={"badge badge-light st-" + item.situation}>{st}</span>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-link btn-sm mt-2" 
                      onClick={(e) => {callModal(item.id)}}
                    >Mais Detalhes</button>
                </div>
            </div>
        </div>
    );
    
  }

  return(
    <>
    <div>
        { (orders.length === 0) ?
              '<div id="vazioPedido" className="d-flex justify-content-center" style={{height: "60px"}}> <h4>Não há nada aqui!</h4></div>' : ''
        }
        <div className="card-columns">
            {orders.map(renderProduct)}
        </div>
    </div>
    <ModalPedido
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
    </>
  );
}

export default OrdersPanel;