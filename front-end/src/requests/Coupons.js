import React, {useEffect, useContext} from 'react';

import { DataContext } from '../Context';

import api from './connection';

const getAtt = (item, action, context) => {
  item.id = item._id;
  if(action === 'create'){
    context.createCoupon(item);
  }
  if(action === 'update'){
    context.updateCoupon(item);
  }
}


const CouponsRequests = {
  GetAllCoupons: (props) =>{
      const context = useContext(DataContext);
      useEffect( () => {
        context.deleteAllCoupons();
        console.log("Pegando dados da API (Cupons)");
        api.get("coupons/all/0", {crossdomain: true})
        .then((response) => {
          response.data.forEach((item, index) => {
            item.id = item._id;
            console.log(item)
            context.createCoupon(item);
          })
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });

      }, [])

      return(<></>);
  },

  InsertCoupon: (props) =>{
    const context = useContext(DataContext);
  
    useEffect( () => {
        const data = props.data;
        if (props.send === 'post') {
        console.log("Mandando dados para a API");
        console.log(data)
        props.onChange();
        api.post("coupons", {...data})
          .then((response) => {
            getAtt(response.data, "create", context);
            alert("Cupom inserido com sucesso");
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
        }
    }, [props])

    return(<></>);
  },

  EditCoupon: (props) =>{
    const context = useContext(DataContext);

    useEffect( () => {
      const data = props.data;
      const id = props.id;
      if (props.send === 'put') {
        console.log("Mandando dados para a API");
        props.onChange();
        api.put("coupons/"+id, {...data})
          .then((response) => {
            api.get("coupons/"+id).then((res) => {
              getAtt(res.data[0], "update", context);
            }).catch((err) => {
              console.error("ops! ocorreu um erro" + err);
            });
            alert("Cupom atualizado com sucesso!");
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
        }
    }, [props])

    return(<></>);
  },

  DeleteCoupon: (props) =>{
    const context = useContext(DataContext);

    useEffect( () => {
      const id = props.id;
      if (props.send === 'del') {
        console.log("Mandando dados para a API");
        props.onChange();
        api.delete("coupons/"+id)
          .then((response) => {
            context.deleteCoupon(id);
            alert("Cupom excluido com sucesso");
            props.history.push('/minhaconta');
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
        }
    }, [props])

    return(<></>);
  }
}

export default CouponsRequests