import React, {useEffect, useContext} from 'react';

import { DataContext } from '../Context';

import api from './connection';


const productRequests = {
  GetAllProducts: (props) =>{
      const context = useContext(DataContext);
      useEffect( () => {
        context.deleteAllProducts();
        console.log("Pegando dados da API");
        api.get("/products", {crossdomain: true})
        .then((response) => {
          response.data.forEach((item, index) => {
            item.id = item._id;
            item.img.forEach((img, index) => {
              if(typeof img.file !== 'undefined'){
                img.path = img.file;
              }
            })
            context.createProduct(item);
          })
          props.onChange();
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
          .then(async (response) => {
            await context.fetchProducts()
            alert("O produto foi criado com sucesso!");
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
        }
    }, [props])

    return(<></>);
  },

  EditProduct: (props) =>{
    const context = useContext(DataContext);

    useEffect( () => {
      const {data, _id} = props;

      if (props.send === 'put') {
        console.log("Mandando dados para a API");
        props.onChange();
        api.put("products/"+_id, {...data})
          .then(async (response) => {
            props.history.push('/minhaconta')
            await context.fetchProducts()
            alert("O produto atualizado com sucesso!");
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
        }
    }, [props])

    return(<></>);
  },

  DeleteProduct: (props) =>{
    const context = useContext(DataContext);

    useEffect( () => {
      const {_id} = props;
      
      if (props.send === 'del') {
        console.log("Mandando dados para a API");
        props.onChange();
        api.delete("products/"+_id)
          .then(async (response) => {
            props.history.push('/minhaconta');
            await context.fetchProducts();
            alert("O produto foi excluido com sucesso!");
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
        }
    }, [props])

    return(<></>);
  }
}

export default productRequests