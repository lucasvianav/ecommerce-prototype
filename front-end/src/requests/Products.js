import React, {useEffect, useContext} from 'react';

import { DataContext } from '../Context';

import api from './connection';

export default {
  
  GetAllProducts: (props) =>{
      const context = useContext(DataContext);
      useEffect( () => {
        context.deleteAllProducts();
        console.log("Pegando dados da API");
        api.get("products/all/0", {crossdomain: true})
          .then((response) => {
            response.data.forEach((item, index) => {
              item.id = item._id;
              item.img.path = item.img.file;
              console.log(item);
              context.createProduct(item);
            })
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });

      }, [])

      return(<></>);
  },

  InsertProduct: (props) =>{
    const context = useContext(DataContext);
  
    useEffect( () => {
      const data = props.data;
      if (props.send === 'post') {
        console.log("Mandando dados para a API");
        console.log(data)
        props.onChange();
        api.post("products", {...data})
          .then((response) => {
            alert("Produto inserido com sucesso");
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
        }
    }, [props])

    return(<></>);
}
}
