import React, {useEffect, useContext} from 'react';
import context from 'react-bootstrap/esm/AccordionContext';

import { DataContext } from '../Context';

import api from './connection';

const getAtt = (item, action, context) => {
  item.id = item._id;
  item.img.forEach((img, index) => {
    var aux = '';
    if(typeof img.file !== 'undefined'){
      img.path = img.file;
    }
  })
  if(action === 'create'){
    context.createProduct(item);
  }
  if(action === 'update'){
    context.updateProduct(item);
  }
}


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
            item.img.forEach((img, index) => {
              var aux = '';
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
          .then((response) => {
            console.log(response.data._id);
            getAtt(response.data, "create", context);
            alert("Produto inserido com sucesso");
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
      const data = props.data;
      const id = props.id;
      if (props.send === 'put') {
        console.log("Mandando dados para a API");
        console.log(id)
        console.log(data);
        props.onChange();
        api.put("products/"+id, {...data})
          .then((response) => {
            getAtt(id, "update", context);
            alert("Produto atualizado com sucesso");
            props.history.push('/minhaconta');
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
      const id = props.id;
      if (props.send === 'del') {
        console.log("Mandando dados para a API");
        props.onChange();
        api.delete("products/"+id)
          .then((response) => {
            context.deleteProduct(id);
            alert("Produto excluido com sucesso");
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

